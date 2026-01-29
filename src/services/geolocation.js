// Gets user location using browser geolocation API
const GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000
};

export function getCurrentPosition() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by your browser'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            (error) => {
                const errorMessages = {
                    1: 'Location permission denied. Please allow location access to find nearby places.',
                    2: 'Unable to determine your location. Please try again.',
                    3: 'Location request timed out. Please try again.'
                };
                reject(new Error(errorMessages[error.code] || 'Failed to get location'));
            },
            GEOLOCATION_OPTIONS
        );
    });
}
