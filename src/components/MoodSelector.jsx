// Mood selection screen with interactive cards and distance picker
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

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#F0F4F1',
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
            color: '#1E293B',
            marginBottom: '12px'
        },
        subtitle: {
            fontSize: '1.25rem',
            color: '#5F6D64'
        },
        grid: {
            marginBottom: '24px'
        },
        card: {
            position: 'relative',
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: '#FAFBFA',
            border: '2px solid #D0DCD4',
            boxShadow: '0 8px 24px -8px rgba(0, 0, 0, 0.06)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left',
            minHeight: '140px',
            display: 'flex',
            flexDirection: 'column'
        },
        cardSelected: {
            border: '3px solid #0F766E',
            backgroundColor: '#F0F7F6',
            boxShadow: '0 20px 40px -12px rgba(15, 118, 110, 0.25)',
            transform: 'scale(1.02)'
        },
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
            color: '#1E293B',
            marginBottom: '4px'
        },
        cardDesc: {
            fontSize: '0.9rem',
            color: '#5F6D64',
            lineHeight: '1.4'
        },
        checkmark: {
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            backgroundColor: '#0F766E',
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
            backgroundColor: '#FAFBFA',
            borderRadius: '24px 24px 0 0',
            padding: '24px 32px',
            boxShadow: '0 -8px 30px -10px rgba(0, 0, 0, 0.12)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            zIndex: 100,
            borderTop: '1px solid #D0DCD4'
        },
        selectGroup: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
        },
        selectLabel: {
            fontSize: '1.125rem',
            color: '#5F6D64'
        },
        select: {
            padding: '12px 20px',
            fontSize: '1rem',
            fontWeight: '600',
            backgroundColor: '#F0F4F1',
            border: '1px solid #D0DCD4',
            borderRadius: '12px',
            color: '#1E293B',
            cursor: 'pointer'
        },
        button: {
            padding: '20px 48px',
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#FFFFFF',
            backgroundColor: '#0F766E',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            boxShadow: '0 10px 40px -10px rgba(15, 118, 110, 0.5)',
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
            backgroundColor: '#FAFBFA',
            borderRadius: '9999px',
            boxShadow: '0 4px 20px -4px rgba(0, 0, 0, 0.08)',
            border: '1px solid #D0DCD4'
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
                            <span style={{ color: '#5F6D64', fontWeight: '500' }}>{locationName}</span>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.title}>What's your vibe? 🎯</h1>
                    <p style={styles.subtitle}>Pick a mood and we'll find your perfect spot</p>
                </div>

                {/* Mood Grid */}
                <div className="mood-grid" style={styles.grid}>
                    {moods.map((mood) => {
                        const isSelected = selectedMood?.id === mood.id;
                        return (
                            <button
                                key={mood.id}
                                className={`mood-card ${isSelected ? 'selected' : ''}`}
                                style={isSelected ? { ...styles.card, ...styles.cardSelected } : styles.card}
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
