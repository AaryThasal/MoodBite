// Fetches nearby places from OpenStreetMap Overpass API with retry and fallback

// API endpoints for failover
const OVERPASS_ENDPOINTS = [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://maps.mail.ru/osm/tools/overpass/api/interpreter'
];

const MAX_RETRIES = 3;
const INITIAL_RETRY_DELAY = 500;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Builds Overpass query string from location and tags
function buildOverpassQuery(lat, lng, radiusMeters, osmTags) {
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

// Converts API response to clean place objects
function normalizePlaces(elements) {
    return elements
        .filter(el => el.tags && el.tags.name)
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

// Fetches from one Overpass endpoint
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

// Fetches places with retries across multiple endpoints
async function fetchPlaces(lat, lng, radiusMeters, osmTags) {
    const query = buildOverpassQuery(lat, lng, radiusMeters, osmTags);
    let lastError = null;

    for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
        const endpoint = OVERPASS_ENDPOINTS[attempt % OVERPASS_ENDPOINTS.length];

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 15000);

            const result = await fetchFromEndpoint(endpoint, query, controller.signal);
            clearTimeout(timeoutId);
            return result;
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt + 1} failed (${endpoint}):`, error.message);

            if (error.name === 'AbortError' || attempt === MAX_RETRIES - 1) {
                continue;
            }

            const delay = INITIAL_RETRY_DELAY * Math.pow(2, attempt);
            await sleep(delay);
        }
    }

    throw lastError || new Error('Failed to fetch places after multiple attempts');
}

// Fetches places using primary tags, falls back to secondary if empty
export async function fetchNearbyPlaces(lat, lng, radiusMeters, primaryTags, fallbackTags = [], fallbackMessage = '') {
    try {
        let places = await fetchPlaces(lat, lng, radiusMeters, primaryTags);

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
        if (error.name === 'TypeError' && error.message.includes('fetch')) {
            throw new Error('Network error. Please check your internet connection.');
        }
        throw new Error('Failed to fetch nearby places. Please try again.');
    }
}
