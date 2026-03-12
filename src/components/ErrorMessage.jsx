// Displays error message with optional retry button
function ErrorMessage({ message, onRetry = null }) {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 32px',
            textAlign: 'center',
            maxWidth: '400px',
            margin: '0 auto'
        },
        iconBox: {
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#FDECEA',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px'
        },
        icon: {
            fontSize: '2.5rem'
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#3E2723',
            marginBottom: '12px'
        },
        message: {
            fontSize: '1rem',
            color: '#8B7355',
            marginBottom: '32px',
            lineHeight: '1.6'
        },
        button: {
            padding: '16px 40px',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#FFFFFF',
            backgroundColor: '#E74C3C',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px -10px rgba(231, 76, 60, 0.5)',
            transition: 'all 0.2s ease'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.iconBox}>
                <span style={styles.icon}>😕</span>
            </div>
            <h2 style={styles.title}>Oops!</h2>
            <p style={styles.message}>{message}</p>
            {onRetry && (
                <button style={styles.button} onClick={onRetry}>
                    Try Again
                </button>
            )}
        </div>
    );
}

export default ErrorMessage;
