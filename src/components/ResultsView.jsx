// Results screen showing places list on left and map on right
import { useState } from 'react';
import MapView from './MapView';
import PlacesList from './PlacesList';
import { getMoodConfig } from '../services/moodConfig';

const RADIUS_OPTIONS = [
    { value: 500, label: '500 m' },
    { value: 1000, label: '1 km' },
    { value: 2000, label: '2 km' },
    { value: 3000, label: '3 km' },
    { value: 5000, label: '5 km' }
];

function ResultsView({
    userLocation,
    places,
    mood,
    radius,
    fallbackMessage,
    onChangeMood,
    onChangeLocation,
    onRadiusChange
}) {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const moodConfig = getMoodConfig(mood);

    const handleSelectPlace = (place) => setSelectedPlace(place);

    const styles = {
        container: {
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#FDF6E3'
        },
        header: {
            flexShrink: 0,
            backgroundColor: '#FFFBF5',
            borderBottom: '1px solid #E8D5C4',
            boxShadow: '0 1px 3px rgba(62, 39, 35, 0.06)'
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
            backgroundColor: '#E74C3C',
            boxShadow: '0 4px 14px -3px rgba(231, 76, 60, 0.5)'
        },
        infoGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.875rem',
            color: '#8B7355'
        },
        radiusSelect: {
            padding: '6px 14px',
            backgroundColor: '#FDF6E3',
            borderRadius: '8px',
            fontWeight: '500',
            fontSize: '0.875rem',
            color: '#8B7355',
            border: '1px solid #E8D5C4',
            cursor: 'pointer',
            outline: 'none',
            appearance: 'none',
            WebkitAppearance: 'none',
            MozAppearance: 'none',
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%238B7355' d='M2 4l4 4 4-4'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 10px center',
            paddingRight: '32px',
            minWidth: '90px'
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
            color: '#7CB342',
            backgroundColor: '#FDF6E3',
            border: '1px solid #E8D5C4',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        changeLocationBtn: {
            padding: '12px 24px',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#8B7355',
            backgroundColor: '#FDF6E3',
            border: '1px solid #E8D5C4',
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
            backgroundColor: '#F5ECD9',
            borderRight: '1px solid #E8D5C4',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        },
        mapPanel: {
            flex: 1,
            padding: '20px',
            backgroundColor: '#FDF6E3'
        },
        mapContainer: {
            height: '100%',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 10px 40px -10px rgba(62, 39, 35, 0.15)',
            border: '1px solid #E8D5C4'
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
                            <select
                                style={styles.radiusSelect}
                                value={radius}
                                onChange={(e) => onRadiusChange(Number(e.target.value))}
                            >
                                {RADIUS_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
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
