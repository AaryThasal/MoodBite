/**
 * Main App component - controls application state flow.
 * 
 * Flow: LocationPrompt → MoodSelector → ResultsView
 */
import { useState, useCallback } from 'react';
import LocationPrompt from './components/LocationPrompt';
import MoodSelector from './components/MoodSelector';
import ResultsView from './components/ResultsView';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import { getCurrentPosition } from './services/geolocation';
import { fetchNearbyPlaces } from './services/placesApi';
import { getMoodConfig } from './services/moodConfig';
import { filterAndSortPlaces } from './services/placeFilter';

function App() {
  const [location, setLocation] = useState(null);
  const [mood, setMood] = useState(null);
  const [radius, setRadius] = useState(null);
  const [places, setPlaces] = useState([]);
  const [fallbackMessage, setFallbackMessage] = useState('');

  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingPlaces, setIsLoadingPlaces] = useState(false);
  const [error, setError] = useState(null);
  const [locationError, setLocationError] = useState(null);

  const handleLocationSet = useCallback(async (manualLocation) => {
    if (manualLocation && manualLocation.lat) {
      setLocation(manualLocation);
      return;
    }

    setIsLoadingLocation(true);
    setLocationError(null);

    try {
      const coords = await getCurrentPosition();
      setLocation({ ...coords, displayName: null });
    } catch (err) {
      setLocationError(err.message);
    } finally {
      setIsLoadingLocation(false);
    }
  }, []);

  const handleMoodConfirm = useCallback(async (moodId, customRadius) => {
    if (!location) return;

    setMood(moodId);
    setRadius(customRadius);
    setIsLoadingPlaces(true);
    setError(null);
    setFallbackMessage('');

    try {
      const moodConfig = getMoodConfig(moodId);
      const { places: rawPlaces, message } = await fetchNearbyPlaces(
        location.lat,
        location.lng,
        customRadius,
        moodConfig.osmTags,
        moodConfig.fallbackTags,
        moodConfig.fallbackMessage
      );

      const sortedPlaces = filterAndSortPlaces(rawPlaces, location);
      setPlaces(sortedPlaces);
      setFallbackMessage(message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingPlaces(false);
    }
  }, [location]);

  const handleChangeMood = useCallback(() => {
    setMood(null);
    setRadius(null);
    setPlaces([]);
    setError(null);
    setFallbackMessage('');
  }, []);

  const handleChangeLocation = useCallback(() => {
    setLocation(null);
    setMood(null);
    setRadius(null);
    setPlaces([]);
    setLocationError(null);
  }, []);

  const handleRetry = useCallback(() => {
    if (mood && radius) handleMoodConfirm(mood, radius);
  }, [mood, radius, handleMoodConfirm]);

  // Screen 1: No location
  if (!location) {
    return (
      <LocationPrompt
        onLocationSet={handleLocationSet}
        isLoading={isLoadingLocation}
        error={locationError}
      />
    );
  }

  // Screen 2: No mood
  if (!mood) {
    return (
      <MoodSelector
        onConfirm={handleMoodConfirm}
        locationName={location.displayName}
      />
    );
  }

  // Screen 3: Loading
  if (isLoadingPlaces) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #fef3c7 100%)'
      }}>
        <LoadingSpinner message="Finding places near you..." />
      </div>
    );
  }

  // Screen 4: Error
  if (error) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f0fdfa 0%, #ffffff 50%, #fef3c7 100%)'
      }}>
        <ErrorMessage message={error} onRetry={handleRetry} />
      </div>
    );
  }

  // Screen 5: Results
  return (
    <ResultsView
      userLocation={location}
      places={places}
      mood={mood}
      radius={radius}
      fallbackMessage={fallbackMessage}
      onChangeMood={handleChangeMood}
      onChangeLocation={handleChangeLocation}
    />
  );
}

export default App;
