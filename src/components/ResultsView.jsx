// Results screen showing places list on left and map on right
import { useState } from 'react';
import MapView from './MapView';
import PlacesList from './PlacesList';
import { getMoodConfig } from '../services/moodConfig';

function ResultsView({
    userLocation,
    places,
    mood,
    radius,
    fallbackMessage,
    onChangeMood,
    onChangeLocation
}) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const moodConfig = getMoodConfig(mood);

    const handleSelectPlace = (place) => setSelectedPlace(place);
    const formatRadius = (r) => r >= 1000 ? `${r / 1000} km` : `${r} m`;

    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#F8FAFC'
        },
        header: {
            flexShrink: 0,
            backgroundColor: '#FFFFFF',
            borderBottom: '1px solid #E2E8F0',
            boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
        },
        headerInner: {
            maxWidth: '1536px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        leftSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        },
        moodBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            padding: '10px 20px',
            borderRadius: '9999px',
            color: '#FFFFFF',
            fontWeight: '600',
            fontSize: '0.875rem',
            backgroundColor: '#0F766E',
            boxShadow: '0 4px 14px -3px rgba(15, 118, 110, 0.5)'
        },
        infoGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.875rem',
            color: '#64748B'
        },
        radiusBadge: {
            padding: '6px 14px',
            backgroundColor: '#F8FAFC',
            borderRadius: '8px',
            fontWeight: '500'
        },
        rightSection: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
        },
        changeMoodBtn: {
            padding: '12px 24px',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#0F766E',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        changeLocationBtn: {
            padding: '12px 24px',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#64748B',
            backgroundColor: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        fallback: {
            padding: '12px 24px',
            backgroundColor: '#fffbeb',
            borderTop: '1px solid #fef3c7',
            fontSize: '0.875rem',
            color: '#F59E0B'
        },
        main: {
            flex: 1,
            overflow: 'hidden',
            display: 'flex'
        },
        mainInner: {
            height: '100%',
            maxWidth: '1536px',
            margin: '0 auto',
            width: '100%',
            display: 'flex'
        },
        listPanel: {
            width: '440px',
            flexShrink: 0,
            backgroundColor: '#FFFFFF',
            borderRight: '1px solid #E2E8F0',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        mapPanel: {
            flex: 1,
            padding: '20px',
            backgroundColor: '#F8FAFC'
        },
        mapContainer: {
            height: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.15)',
            border: '1px solid #E2E8F0'
        }
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <header style={styles.header}>
                <div style={styles.headerInner}>
                    {/* Left */}
                    <div style={styles.leftSection}>
                        <div style={styles.moodBadge}>
                            <span style={{ fontSize: '1rem' }}>{moodConfig.emoji}</span>
                            <span>{moodConfig.name}</span>
                        </div>
                        <div style={styles.infoGroup}>
                            <span style={styles.radiusBadge}>{formatRadius(radius)}</span>
                            {userLocation.displayName && (
                                <span style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    from {userLocation.displayName}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Right */}
                    <div style={styles.rightSection}>
                        <button style={styles.changeMoodBtn} onClick={onChangeMood}>
                            Change Mood
                        </button>
                        <button style={styles.changeLocationBtn} onClick={onChangeLocation}>
                            📍 Location
                        </button>
                    </div>
                </div>

                {/* Fallback */}
                {fallbackMessage && (
                    <div style={styles.fallback}>
                        <strong>💡 Tip:</strong> {fallbackMessage}
                    </div>
                )}
            </header>

            {/* Main */}
            <main style={styles.main}>
                <div style={styles.mainInner}>
                    {/* List Panel */}
                    <div style={styles.listPanel}>
                        <PlacesList
                            places={places}
                            selectedPlaceId={selectedPlace?.id}
                            onSelectPlace={handleSelectPlace}
                        />
                    </div>

                    {/* Map Panel */}
                    <div style={styles.mapPanel}>
                        <div style={styles.mapContainer}>
                            <MapView
                                userLocation={userLocation}
                                places={places}
                                selectedPlace={selectedPlace}
                                onSelectPlace={handleSelectPlace}
                                moodRadius={radius}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ResultsView;
