/**
 * Fetches nearby places from OpenStreetMap using the Overpass API.
 * Includes fallback logic when primary tags return no results.
 * Uses multiple API endpoints with automatic retry for reliability.
 */

// Multiple Overpass API endpoints for load balancing and failover
const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 500; // ms

/**
 * Sleep utility for retry delays
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Builds an Overpass QL query for the given parameters
 */
function buildOverpassQuery(lat, lng, radiusMeters, osmTags) {
    // Build node queries for each tag
    const tagQueries = osmTags.map(tag => {
        const [key, value] = tag.split('=');
        return `node["${key}"="${value}"](around:${radiusMeters},${lat},${lng});`;
    }).join('\n  ');

    return `
[out:json][timeout:25];
(
  ${tagQueries}
);
out body;
`;
}

/**
 * Normalizes raw Overpass API response into a consistent place format
 */
function normalizePlaces(elements) {
    return elements
        .filter(el => el.tags && el.tags.name) // Only include places with names
        .map(el => ({
            id: el.id,
            name: el.tags.name,
            lat: el.lat,
            lng: el.lon,
            type: el.tags.amenity || 'place',
            cuisine: el.tags.cuisine || null,
            openingHours: el.tags.opening_hours || null,
            phone: el.tags.phone || null,
            website: el.tags.website || null,
            takeaway: el.tags.takeaway === 'yes',
            outdoor_seating: el.tags.outdoor_seating === 'yes'
        }));
}

/**
 * Makes a single fetch attempt to an Overpass endpoint
 */
async function fetchFromEndpoint(endpoint, query, signal) {
    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `data=${encodeURIComponent(query)}`,
        signal
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    return normalizePlaces(data.elements || []);
}

/**
 * Fetches nearby places from Overpass API with automatic retry
 */
async function fetchPlaces(lat, lng, radiusMeters, osmTags) {
    const query = buildOverpassQuery(lat, lng, radiusMeters, osmTags);
    let lastError = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        // Cycle through different endpoints on each retry
        const endpoint = OVERPASS_ENDPOINTS[attempt % OVERPASS_ENDPOINTS.length];

        try {
            // Create abort controller for timeout
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const result = await fetchFromEndpoint(endpoint, query, controller.signal);
            clearTimeout(timeoutId);
            return result;
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt + 1} failed (${endpoint}):`, error.message);

            // Don't retry on abort or if it's the last attempt
            if (error.name === 'AbortError' || attempt === MAX_RETRIES - 1) {
                continue;
            }

            // Exponential backoff before retry
            const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
            await sleep(delay);
        }
    }

    // All retries exhausted
    throw lastError || new Error('Failed to fetch places after multiple attempts');
}

/**
 * Fetches nearby places with automatic fallback.
 * If primary tags return no results, tries fallback tags.
 * 
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} radiusMeters - Search radius
 * @param {string[]} primaryTags - Primary OSM tags to search
 * @param {string[]} fallbackTags - Fallback OSM tags if primary returns empty
 * @param {string} fallbackMessage - Message to show when fallback is used
 * @returns {Promise<{places: Place[], usedFallback: boolean, message: string}>}
 */
export async function fetchNearbyPlaces(lat, lng, radiusMeters, primaryTags, fallbackTags = [], fallbackMessage = '') {
    try {
        // Try primary tags first
        let places = await fetchPlaces(lat, lng, radiusMeters, primaryTags);

        // If no results and we have fallback tags, try them
        if (places.length === 0 && fallbackTags.length > 0) {
            places = await fetchPlaces(lat, lng, radiusMeters, fallbackTags);

            return {
                places,
                usedFallback: true,
                message: places.length > 0 ? fallbackMessage : ''
            };
        }

        return {
            places,
            usedFallback: false,
            message: ''
        };
    } catch (error) {
        // Network or parsing errors
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw new Error('Failed to fetch nearby places. Please try again.');
    }
}
