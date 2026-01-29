// Adds distance to places and sorts them by proximity
import { calculateDistance } from '../utils/distance.js';

// Calculates distance for each place and sorts nearest first
export function filterAndSortPlaces(places, userLocation) {
    if (!places || places.length === 0) {
        return [];
    }

    const placesWithDistance = places.map(place => ({
        ...place,
        distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            place.lat,
            place.lng
        )
    }));

    return placesWithDistance.sort((a, b) => a.distance - b.distance);
}

// Returns readable label for place type
export function getPlaceTypeLabel(type) {
    const labels = {
        cafe: 'Cafe',
        restaurant: 'Restaurant',
        fast_food: 'Fast Food',
        bar: 'Bar',
        pub: 'Pub'
    };
    return labels[type] || 'Food Place';
}
