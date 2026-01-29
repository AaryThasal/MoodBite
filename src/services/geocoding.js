// Converts addresses to coordinates using Nominatim API
const NOMINATIM_API_URL = 'https://nominatim.openstreetmap.org/search';

// Searches for addresses and returns matching locations
export async function searchAddress(query) {
    if (!query || query.trim().length < 3) {
        return [];
    }

    try {
        const params = new URLSearchParams({
            q: query.trim(),
            format: 'json',
            limit: '5', // Return top 5 results
            addressdetails: '1'
        });

        const response = await fetch(`${NOMINATIM_API_URL}?${params}`, {
            headers: {
                'User-Agent': 'MoodBite/1.0'
            }
        });

        if (!response.ok) {
            throw new Error('Address search failed');
        }

        const data = await response.json();

        return data.map(item => ({
            id: item.place_id,
            lat: parseFloat(item.lat),
            lng: parseFloat(item.lon),
            displayName: item.display_name,
            // Shorter name for display
            shortName: buildShortName(item)
        }));
    } catch (error) {
        console.error('Geocoding error:', error);
        throw new Error('Could not search for that address. Please try again.');
    }
}

// Creates a short display name from address parts
function buildShortName(item) {
    const parts = [];

    if (item.address) {
        const addr = item.address;
        if (addr.amenity) parts.push(addr.amenity);
        else if (addr.road) parts.push(addr.road);
        else if (addr.neighbourhood) parts.push(addr.neighbourhood);
        else if (addr.suburb) parts.push(addr.suburb);

        if (addr.city) parts.push(addr.city);
        else if (addr.town) parts.push(addr.town);
        else if (addr.village) parts.push(addr.village);
    }

    if (parts.length === 0 && item.display_name) {
        const displayParts = item.display_name.split(',').slice(0, 2);
        return displayParts.join(',').trim();
    }

    return parts.join(', ') || item.display_name.split(',')[0];
}
