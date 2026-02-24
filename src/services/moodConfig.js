// Mood settings with search tags, radius, and display info

// Distance dropdown options
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
        osmTags: ['amenity=cafe'],
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
    casual: {
        id: 'casual',
        name: 'Casual',
        emoji: '🍽️',
        description: 'All food options',
        defaultRadius: 1500,
        osmTags: ['amenity=restaurant', 'amenity=cafe', 'amenity=fast_food', 'amenity=bar', 'amenity=pub'],
        fallbackTags: [],
        fallbackMessage: '',
        color: '#9B59B6'
    }
};

// Get mood by id
export function getMoodConfig(moodId) {
    return MOODS[moodId] || null;
}

// Get all moods as array
export function getAllMoods() {
    return Object.values(MOODS);
}
