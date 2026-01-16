/**
 * Applies mood-based filtering and sorting to places.
 * Adds distance information and sorts by proximity.
 */

import { calculateDistance } from '../utils/distance.js';

/**
 * Adds distance from user to each place and sorts by distance
 * @param {Place[]} places - Array of places from API
 * @param {object} userLocation - User's {lat, lng}
 * @returns {Place[]} Places with distance, sorted nearest first
 */
export function filterAndSortPlaces(places, userLocation) {
    if (!places || places.length === 0) {
        return [];
    }

    // Add distance to each place
    const placesWithDistance = places.map(place => ({
        ...place,
        distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            place.lat,
            place.lng
        )
    }));

    // Sort by distance (nearest first) - applies to all moods
    return placesWithDistance.sort((a, b) => a.distance - b.distance);
}

/**
 * Gets a display label for place type
 */
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
