// Single place card showing name, type, cuisine and distance
import { formatDistance } from '../utils/distance';
import { getPlaceTypeLabel } from '../services/placeFilter';

function PlaceCard({ place, isSelected, onClick, index }) {
    const styles = {
        card: {
            position: 'relative',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isSelected ? '#F8FAFC' : '#FFFFFF',
            border: isSelected ? '2px solid #0F766E' : '2px solid #E2E8F0',
            boxShadow: isSelected
                ? '0 10px 25px -5px rgba(15, 118, 110, 0.2)'
                : '0 4px 15px -3px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '16px'
        },
        rank: {
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            backgroundColor: isSelected ? '#0F766E' : '#F8FAFC',
            color: isSelected ? '#FFFFFF' : '#64748B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.875rem',
            fontWeight: '700',
            flexShrink: 0
        },
        content: {
            flex: 1,
            minWidth: 0
        },
        name: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#0F172A',
            marginBottom: '6px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        meta: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flexWrap: 'wrap'
        },
        typeBadge: {
            padding: '4px 10px',
            fontSize: '0.75rem',
            fontWeight: '600',
            backgroundColor: isSelected ? '#F8FAFC' : '#F8FAFC',
            color: isSelected ? '#0F766E' : '#64748B',
            borderRadius: '6px'
        },
        cuisine: {
            fontSize: '0.75rem',
            color: '#64748B',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        distance: {
            flexShrink: 0,
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#F59E0B'
        }
    };

    return (
        <div style={styles.card} onClick={onClick}>
            <div style={styles.rank}>{index + 1}</div>
            <div style={styles.content}>
                <h3 style={styles.name}>{place.name}</h3>
                <div style={styles.meta}>
                    <span style={styles.typeBadge}>{getPlaceTypeLabel(place.type)}</span>
                    {place.cuisine && <span style={styles.cuisine}>{place.cuisine}</span>}
                </div>
            </div>
            <span style={styles.distance}>{formatDistance(place.distance)}</span>
        </div>
    );
}

export default PlaceCard;
