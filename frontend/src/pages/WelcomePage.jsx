import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to bottom right, #ffffff, #f1f5f9, #e0e7ff)',
    padding: '64px 24px',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  brandName: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    color: '#0f172a',
    letterSpacing: '-0.01em',
  },
  logoutBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    color: '#64748b',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    transition: 'color 160ms ease',
  },
  main: {
    maxWidth: '960px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '24px',
  },
  heroShell: {
    padding: '1px',
    borderRadius: '16px',
    background:
      'linear-gradient(to right bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5), rgba(203,213,225,0.3))',
    boxShadow:
      'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px',
  },
  heroSurface: {
    padding: '48px 64px',
    borderRadius: '15px',
    background: 'rgba(248,249,250,0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  eyebrow: {
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
  },
  heroTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '48px',
    fontWeight: 400,
    lineHeight: '52px',
    letterSpacing: '-0.025em',
    color: '#0f172a',
  },
  heroSubtitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '16px',
    fontWeight: 400,
    lineHeight: '24px',
    color: '#64748b',
    maxWidth: '480px',
  },
  divider: {
    height: '0.8px',
    background: '#f1f5f9',
    margin: '8px 0',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '12px',
  },
  cardShell: {
    padding: '1px',
    borderRadius: '16px',
    background:
      'linear-gradient(to right bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5), rgba(203,213,225,0.3))',
    boxShadow:
      'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px',
  },
  cardSurface: {
    padding: '24px',
    borderRadius: '15px',
    background: 'rgba(248,249,250,0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  cardIcon: {
    width: '32px',
    height: '32px',
    borderRadius: '4px',
    background: '#f1f5f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#0f172a',
  },
  cardTitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#0f172a',
  },
  cardDesc: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#64748b',
  },
  tokenSection: {
    padding: '1px',
    borderRadius: '16px',
    background:
      'linear-gradient(to right bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5), rgba(203,213,225,0.3))',
    boxShadow:
      'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px',
  },
  tokenSurface: {
    padding: '24px',
    borderRadius: '15px',
    background: 'rgba(248,249,250,0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  tokenLabel: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
  },
  tokenValue: {
    fontFamily: 'monospace',
    fontSize: '12px',
    lineHeight: '18px',
    color: '#0f172a',
    background: '#f1f5f9',
    padding: '8px 12px',
    borderRadius: '4px',
    wordBreak: 'break-all',
    border: '0.8px solid #f1f5f9',
  },
}

const FEATURES = [
  {
    title: 'Autenticación JWT',
    description:
      'Tokens de acceso con expiración de 300 segundos y tokens de refresco de larga duración.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: 'Sesión protegida',
    description:
      'Las rutas privadas verifican la sesión activa antes de mostrar el contenido.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    title: 'FastAPI Backend',
    description:
      'API REST construida con FastAPI, corriendo en http://localhost:8000.',
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

export default function WelcomePage() {
  const { tokens, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  const truncateToken = (token) => {
    if (!token) return ''
    return token.length > 60 ? `${token.slice(0, 60)}…` : token
  }

  return (
    <div style={styles.page}>
      {/* Top bar */}
      <nav style={styles.topBar}>
        <div style={styles.brand}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span style={styles.brandName}>Compliance Platform</span>
        </div>
        <button style={styles.logoutBtn} onClick={handleLogout}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Cerrar sesión
        </button>
      </nav>

      {/* Main content */}
      <main style={styles.main}>
        {/* Hero */}
        <div style={styles.heroShell}>
          <div style={styles.heroSurface}>
            <span style={styles.eyebrow}>Panel de control</span>
            <h1 style={styles.heroTitle}>Bienvenido al sistema</h1>
            <p style={styles.heroSubtitle}>
              Ha iniciado sesión correctamente. Su sesión está activa y protegida
              mediante tokens JWT.
            </p>
            <div style={styles.divider} />
            <p style={{ ...styles.cardDesc, fontSize: '12px' }}>
              Token de acceso expira en{' '}
              <strong>{tokens?.expires_in ?? 300} segundos</strong> desde el
              inicio de sesión.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div style={styles.grid}>
          {FEATURES.map((f) => (
            <div key={f.title} style={styles.cardShell}>
              <div style={styles.cardSurface}>
                <div style={styles.cardIcon}>{f.icon}</div>
                <p style={styles.cardTitle}>{f.title}</p>
                <p style={styles.cardDesc}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Token info */}
        <div style={styles.tokenSection}>
          <div style={styles.tokenSurface}>
            <p style={styles.tokenLabel}>Información de sesión</p>
            <div>
              <p style={{ ...styles.cardDesc, fontSize: '12px', marginBottom: '4px' }}>
                Access token
              </p>
              <p style={styles.tokenValue}>{truncateToken(tokens?.access_token)}</p>
            </div>
            <div>
              <p style={{ ...styles.cardDesc, fontSize: '12px', marginBottom: '4px' }}>
                Token type
              </p>
              <p style={styles.tokenValue}>{tokens?.token_type}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
