// Scrollable list of place cards sorted by distance
import PlaceCard from './PlaceCard';

function PlacesList({ places, selectedPlaceId, onSelectPlace }) {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        },
        header: {
            flexShrink: 0,
            padding: '24px 28px',
            borderBottom: '1px solid #D0DCD4',
            backgroundColor: '#E8EEEA'
        },
        title: {
            fontSize: '1.375rem',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '4px'
        },
        subtitle: {
            fontSize: '0.875rem',
            color: '#5F6D64'
        },
        scrollArea: {
            flex: 1,
            overflowY: 'auto',
            padding: '20px',
            backgroundColor: '#E8EEEA'
        },
        cardList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
        },
        emptyState: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 32px',
            textAlign: 'center',
            backgroundColor: '#E8EEEA'
        },
        emptyIcon: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#F0F4F1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            marginBottom: '24px'
        },
        emptyTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1E293B',
            marginBottom: '8px'
        },
        emptyText: {
            fontSize: '0.875rem',
            color: '#5F6D64',
            maxWidth: '220px'
        }
    };

    if (places.length === 0) {
        return (
            <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🔍</div>
                <h3 style={styles.emptyTitle}>No places found</h3>
                <p style={styles.emptyText}>Try a different mood or expand your search area</p>
            </div>
        );
    }

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Nearby Places</h2>
                <p style={styles.subtitle}>{places.length} spots • sorted by distance</p>
            </div>
            <div style={styles.scrollArea}>
                <div style={styles.cardList}>
                    {places.map((place, index) => (
                        <PlaceCard
                            key={place.id}
                            place={place}
                            isSelected={selectedPlaceId === place.id}
                            onClick={() => onSelectPlace(place)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default PlacesList;
