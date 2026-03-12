// Location screen - lets user share location or search an address
import { useState } from 'react';
import { searchAddress } from '../services/geocoding';

function LocationPrompt({ onLocationSet, isLoading, error }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);

    const handleSearch = async () => {
        if (searchQuery.trim().length < 3) {
            setSearchError('Please enter at least 3 characters');
            return;
        }
        setIsSearching(true);
        setSearchError(null);
        setSearchResults([]);
        try {
            const results = await searchAddress(searchQuery);
            if (results.length === 0) {
                setSearchError('No locations found. Try a different search.');
            } else {
                setSearchResults(results);
            }
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setIsSearching(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleSelectResult = (result) => {
        onLocationSet({
            lat: result.lat,
            lng: result.lng,
            displayName: result.shortName
        });
    };

    const styles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#F0F4F1',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px'
        },
        inner: {
            width: '100%',
            maxWidth: '480px'
        },
        hero: {
            textAlign: 'center',
            marginBottom: '48px',
            padding: '32px',
            backgroundColor: '#E8EEEA',
            borderRadius: '32px'
        },
        iconBox: {
            width: '96px',
            height: '96px',
            borderRadius: '32px',
            backgroundColor: '#0F766E',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: '0 20px 40px -10px rgba(15, 118, 110, 0.4)'
        },
        icon: {
            fontSize: '3rem'
        },
        title: {
            fontSize: '3rem',
            fontWeight: '800',
            color: '#1E293B',
            marginBottom: '12px'
        },
        subtitle: {
            fontSize: '1.25rem',
            color: '#5F6D64'
        },
        card: {
            backgroundColor: '#E8EEEA',
            borderRadius: '32px',
            padding: '40px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
            marginBottom: '24px'
        },
        primaryBtn: {
            width: '100%',
            padding: '20px 32px',
            fontSize: '1.125rem',
            fontWeight: '700',
            color: '#FFFFFF',
            backgroundColor: '#0F766E',
            border: 'none',
            borderRadius: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            boxShadow: '0 10px 40px -10px rgba(15, 118, 110, 0.5)',
            transition: 'all 0.2s ease'
        },
        error: {
            marginTop: '16px',
            padding: '12px 16px',
            backgroundColor: '#fef2f2',
            borderRadius: '12px',
            color: '#dc2626',
            fontSize: '0.875rem',
            textAlign: 'center'
        },
        divider: {
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '32px 0'
        },
        line: {
            flex: 1,
            height: '1px',
            backgroundColor: '#C5D1C8'
        },
        dividerText: {
            color: '#5F6D64',
            fontSize: '0.875rem',
            fontWeight: '500'
        },
        inputGroup: {
            display: 'flex',
            gap: '12px'
        },
        input: {
            flex: 1,
            padding: '16px 20px',
            fontSize: '1rem',
            backgroundColor: '#F7F9F8',
            border: '2px solid #D0DCD4',
            borderRadius: '14px',
            color: '#1E293B',
            outline: 'none',
            transition: 'all 0.2s ease'
        },
        searchBtn: {
            padding: '16px 20px',
            fontSize: '1.25rem',
            backgroundColor: '#F7F9F8',
            border: '1px solid #D0DCD4',
            borderRadius: '14px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        resultsList: {
            marginTop: '16px',
            backgroundColor: '#F7F9F8',
            borderRadius: '16px',
            overflow: 'hidden',
            border: '1px solid #D0DCD4'
        },
        resultItem: {
            width: '100%',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            textAlign: 'left',
            backgroundColor: 'transparent',
            border: 'none',
            borderBottom: '1px solid #D0DCD4',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        },
        footer: {
            textAlign: 'center',
            color: '#5F6D64',
            fontSize: '0.875rem'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.inner}>
                {/* Hero */}
                <div style={styles.hero}>
                    <div style={styles.iconBox}>
                        <span style={styles.icon}>🍽️</span>
                    </div>
                    <h1 style={styles.title}>MoodBite</h1>
                    <p style={styles.subtitle}>Find the perfect food for your mood</p>
                </div>

                {/* Main Card */}
                <div style={styles.card}>
                    {/* Primary CTA */}
                    <button
                        style={{
                            ...styles.primaryBtn,
                            opacity: isLoading ? 0.7 : 1,
                            cursor: isLoading ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => onLocationSet(null)}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <span style={{
                                    width: '20px',
                                    height: '20px',
                                    border: '2px solid rgba(255,255,255,0.3)',
                                    borderTopColor: 'white',
                                    borderRadius: '50%',
                                    animation: 'spin 1s linear infinite'
                                }}></span>
                                <span>Finding you...</span>
                            </>
                        ) : (
                            <>
                                <span style={{ fontSize: '1.5rem' }}>📍</span>
                                <span>Use My Location</span>
                            </>
                        )}
                    </button>

                    {error && <p style={styles.error}>{error}</p>}

                    {/* Divider */}
                    <div style={styles.divider}>
                        <div style={styles.line}></div>
                        <span style={styles.dividerText}>or search</span>
                        <div style={styles.line}></div>
                    </div>

                    {/* Search */}
                    <div style={styles.inputGroup}>
                        <input
                            type="text"
                            style={styles.input}
                            placeholder="Enter city or address..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isSearching}
                        />
                        <button
                            style={{
                                ...styles.searchBtn,
                                opacity: (isSearching || searchQuery.trim().length < 3) ? 0.5 : 1
                            }}
                            onClick={handleSearch}
                            disabled={isSearching || searchQuery.trim().length < 3}
                        >
                            {isSearching ? '...' : '🔍'}
                        </button>
                    </div>

                    {searchError && <p style={styles.error}>{searchError}</p>}

                    {/* Results */}
                    {searchResults.length > 0 && (
                        <div style={styles.resultsList}>
                            {searchResults.map(result => (
                                <button
                                    key={result.id}
                                    style={styles.resultItem}
                                    onClick={() => handleSelectResult(result)}
                                >
                                    <span style={{
                                        width: '36px',
                                        height: '36px',
                                        backgroundColor: '#E8EEEA',
                                        borderRadius: '10px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>📍</span>
                                    <span style={{ color: '#5F6D64' }}>{result.shortName}</span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <p style={styles.footer}>🔒 Your location stays private</p>
            </div>
        </div>
    );
}

export default LocationPrompt;
