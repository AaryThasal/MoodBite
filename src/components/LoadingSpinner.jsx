// Animated loading spinner with message
function LoadingSpinner({ message = 'Loading...' }) {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '24px',
            padding: '48px'
        },
        spinnerBox: {
            position: 'relative',
            width: '64px',
            height: '64px'
        },
        spinner: {
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            border: '4px solid #E8D5C4',
            borderTopColor: '#E74C3C',
            animation: 'spin 1s linear infinite'
        },
        emoji: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '1.75rem'
        },
        message: {
            fontSize: '1.125rem',
            color: '#8B7355',
            fontWeight: '500'
        }
    };

    return (
        <div style={styles.container}>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <div style={styles.spinnerBox}>
                <div style={styles.spinner}></div>
                <span style={styles.emoji}>🍽️</span>
            </div>
            <p style={styles.message}>{message}</p>
        </div>
    );
}

export default LoadingSpinner;
