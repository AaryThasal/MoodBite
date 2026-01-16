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
            background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f0fdfa 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px'
        },
        inner: {
            width: '100%',
            maxWidth: '700px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '48px'
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
            gap: '24px',
            marginBottom: '48px'
        },
        card: (isSelected) => ({
            position: 'relative',
            padding: '32px',
            borderRadius: '24px',
            backgroundColor: '#ffffff',
            border: isSelected ? '3px solid #0d9488' : '2px solid #e2e8f0',
            boxShadow: isSelected
                ? '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                : '0 10px 40px -10px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textAlign: 'left',
            transform: isSelected ? 'scale(1.02)' : 'scale(1)'
        }),
        emojiBox: (color) => ({
            width: '64px',
            height: '64px',
            borderRadius: '16px',
            backgroundColor: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '20px'
        }),
        emoji: {
            fontSize: '2.5rem'
        },
        cardTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#1e293b',
            marginBottom: '8px'
        },
        cardDesc: {
            fontSize: '1rem',
            color: '#64748b',
            lineHeight: '1.5'
        },
        checkmark: {
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            backgroundColor: '#0d9488',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 'bold'
        },
        confirmBox: {
            backgroundColor: '#ffffff',
            borderRadius: '24px',
            padding: '40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '32px',
            flexWrap: 'wrap'
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
