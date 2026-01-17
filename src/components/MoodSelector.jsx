/**
 * Mood selection - Interactive card grid with personality
 */
import { useState } from 'react';
import { getAllMoods, DISTANCE_OPTIONS } from '../services/moodConfig';

function MoodSelector({ onConfirm, locationName = null }) {
    const [selectedMood, setSelectedMood] = useState(null);
    const [customRadius, setCustomRadius] = useState(null);

    const moods = getAllMoods();

    const handleMoodSelect = (mood) => {
        setSelectedMood(mood);
        setCustomRadius(mood.defaultRadius);
    };

    const handleConfirm = () => {
        if (selectedMood) {
            onConfirm(selectedMood.id, customRadius);
        }
    };

    // Styles object for reliable rendering
    const styles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f1f5f9 0%, #f8fafc 50%, #f0fdfa 100%)',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '32px 24px',
            paddingBottom: selectedMood ? '140px' : '32px'
        },
        inner: {
            width: '100%',
            maxWidth: '700px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '24px'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: '800',
            color: '#1e293b',
            marginBottom: '12px'
        },
        subtitle: {
            fontSize: '1.25rem',
            color: '#64748b'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '24px'
        },
        card: (isSelected) => ({
            position: 'relative',
            padding: '20px',
            borderRadius: '20px',
            backgroundColor: '#ffffff',
            border: isSelected ? '3px solid #0d9488' : '2px solid #e2e8f0',
            boxShadow: isSelected
                ? '0 20px 40px -12px rgba(13, 148, 136, 0.25)'
                : '0 8px 24px -8px rgba(0, 0, 0, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left',
            transform: isSelected ? 'scale(1.02)' : 'scale(1)'
        }),
        emojiBox: (color) => ({
            width: '52px',
            height: '52px',
            borderRadius: '14px',
            backgroundColor: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '14px'
        }),
        emoji: {
            fontSize: '2rem'
        },
        cardTitle: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '4px'
        },
        cardDesc: {
            fontSize: '0.9rem',
            color: '#64748b',
            lineHeight: '1.4'
        },
        checkmark: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#0d9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '0.9rem'
        },
        confirmBox: {
            position: 'fixed',
            bottom: '0',
            left: '0',
            right: '0',
            backgroundColor: '#ffffff',
            borderRadius: '24px 24px 0 0',
            padding: '24px 32px',
            boxShadow: '0 -8px 30px -10px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            zIndex: 100,
            borderTop: '1px solid #e2e8f0'
        },
        selectGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        },
        selectLabel: {
            fontSize: '1.125rem',
            color: '#475569'
        },
        select: {
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#f1f5f9',
            border: 'none',
            borderRadius: '12px',
            color: '#1e293b',
            cursor: 'pointer'
        },
        button: {
            padding: '20px 48px',
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 10px 40px -10px rgba(13, 148, 136, 0.5)',
            transition: 'all 0.2s ease'
        },
        locationBadge: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '32px'
        },
        badge: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 20px',
            backgroundColor: '#ffffff',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.1)'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.inner}>

                {/* Location Badge */}
                {locationName && (
                    <div style={styles.locationBadge}>
                        <div style={styles.badge}>
                            <span style={{ fontSize: '1.25rem' }}>📍</span>
                            <span style={{ color: '#475569', fontWeight: '500' }}>{locationName}</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>What's your vibe? 🎯</h1>
                    <p style={styles.subtitle}>Pick a mood and we'll find your perfect spot</p>
                </div>

                {/* Mood Grid */}
                <div style={styles.grid}>
                    {moods.map((mood) => {
                        const isSelected = selectedMood?.id === mood.id;
                        return (
                            <button
                                key={mood.id}
                                style={styles.card(isSelected)}
                                onClick={() => handleMoodSelect(mood)}
                            >
                                <div style={styles.emojiBox(mood.color)}>
                                    <span style={styles.emoji}>{mood.emoji}</span>
                                </div>
                                <h3 style={styles.cardTitle}>{mood.name}</h3>
                                <p style={styles.cardDesc}>{mood.description}</p>
                                {isSelected && (
                                    <div style={styles.checkmark}>✓</div>
                                )}
                            </button>
                        );
                    })}
                </div>

                {/* Confirm Section */}
                {selectedMood && (
                    <div style={styles.confirmBox}>
                        <div style={styles.selectGroup}>
                            <span style={styles.selectLabel}>Search within</span>
                            <select
                                style={styles.select}
                                value={customRadius}
                                onChange={(e) => setCustomRadius(Number(e.target.value))}
                            >
                                {DISTANCE_OPTIONS.map(opt => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <button style={styles.button} onClick={handleConfirm}>
                            Find Places →
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MoodSelector;
