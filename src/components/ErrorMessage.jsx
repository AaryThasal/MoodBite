/**
 * Friendly error message with retry
 */
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
            backgroundColor: '#fef2f2',
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
            color: '#1e293b',
            marginBottom: '12px'
        },
        message: {
            fontSize: '1rem',
            color: '#64748b',
            marginBottom: '32px',
            lineHeight: '1.6'
        },
        button: {
            padding: '16px 40px',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#ffffff',
            background: 'linear-gradient(135deg, #0d9488 0%, #0f766e 100%)',
            border: 'none',
            borderRadius: '14px',
            cursor: 'pointer',
            boxShadow: '0 10px 30px -10px rgba(13, 148, 136, 0.5)',
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
