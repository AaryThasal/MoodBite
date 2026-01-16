/**
 * Mood configuration defining search parameters for each mood.
 * Each mood has default radius, OSM tags, fallback tags, and distance options.
 */

// Available distance options for user selection (in meters)
export const DISTANCE_OPTIONS = [
    { value: 500, label: '500 m' },
    { value: 1000, label: '1 km' },
    { value: 1500, label: '1.5 km' },
    { value: 2000, label: '2 km' },
    { value: 3000, label: '3 km' }
];

export const MOODS = {
    work: {
        id: 'work',
        name: 'Work',
        emoji: '💼',
        description: 'Quiet cafes for focus',
        defaultRadius: 500,
        // Primary search: cafes
        osmTags: ['amenity=cafe'],
        // Fallback if no cafes: try restaurants
        fallbackTags: ['amenity=restaurant'],
        fallbackMessage: 'No cafes found nearby. Showing restaurants instead.',
        color: '#4A90A4'
    },
    quickBite: {
        id: 'quickBite',
        name: 'Quick Bite',
        emoji: '⚡',
        description: 'Fast food & takeaway',
        defaultRadius: 1000,
        osmTags: ['amenity=fast_food'],
        fallbackTags: ['amenity=restaurant', 'amenity=cafe'],
        fallbackMessage: 'No fast food found. Showing other food places.',
        color: '#E67E22'
    },
    budget: {
        id: 'budget',
        name: 'Budget',
        emoji: '💰',
        description: 'Affordable local spots',
        defaultRadius: 2000,
        // Budget searches broadly from the start
        osmTags: ['amenity=restaurant', 'amenity=fast_food', 'amenity=cafe'],
        fallbackTags: [], // No fallback needed - already broad
        fallbackMessage: '',
        color: '#27AE60'
    },
    casual: {
        id: 'casual',
        name: 'Casual',
        emoji: '🍽️',
        description: 'All food options',
        defaultRadius: 1500,
        osmTags: ['amenity=restaurant', 'amenity=cafe', 'amenity=fast_food', 'amenity=bar', 'amenity=pub'],
        fallbackTags: [], // Already includes everything
        fallbackMessage: '',
        color: '#9B59B6'
    }
};

/**
 * Get mood config by ID
 */
export function getMoodConfig(moodId) {
    return MOODS[moodId] || null;
}

/**
 * Get all moods as an array for rendering
 */
export function getAllMoods() {
    return Object.values(MOODS);
}
