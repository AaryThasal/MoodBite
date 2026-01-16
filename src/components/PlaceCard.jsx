/**
 * Place card - Scannable, clickable, with clear hierarchy
 */
import { formatDistance } from '../utils/distance';
import { getPlaceTypeLabel } from '../services/placeFilter';

function PlaceCard({ place, isSelected, onClick, index }) {
    const styles = {
        card: {
            position: 'relative',
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: isSelected ? '#f0fdfa' : '#ffffff',
            border: isSelected ? '2px solid #0d9488' : '2px solid #f1f5f9',
            boxShadow: isSelected
                ? '0 10px 25px -5px rgba(13, 148, 136, 0.2)'
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
            backgroundColor: isSelected ? '#0d9488' : '#f1f5f9',
            color: isSelected ? '#ffffff' : '#64748b',
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
            color: '#1e293b',
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
            backgroundColor: isSelected ? '#ccfbf1' : '#f1f5f9',
            color: isSelected ? '#0d9488' : '#64748b',
            borderRadius: '6px'
        },
        cuisine: {
            fontSize: '0.75rem',
            color: '#94a3b8',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap'
        },
        distance: {
            flexShrink: 0,
            fontSize: '0.875rem',
            fontWeight: '700',
            color: '#0d9488'
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
