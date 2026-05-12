import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { loginRequest } from '../services/auth'

const styles = {
  page: {
    minHeight: '100vh',
    display: 'grid',
    placeItems: 'center',
    background: 'linear-gradient(to bottom right, #ffffff, #f1f5f9, #e0e7ff)',
    padding: '64px 16px',
  },
  shell: {
    width: '100%',
    maxWidth: '420px',
    padding: '1px',
    borderRadius: '16px',
    background:
      'linear-gradient(to right bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.5), rgba(203,213,225,0.3))',
    boxShadow:
      'rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0.06) 0px 0px 0px 1px, rgba(0,0,0,0.06) 0px 1px 1px -0.5px, rgba(0,0,0,0.06) 0px 3px 3px -1.5px, rgba(0,0,0,0.06) 0px 6px 6px -3px, rgba(0,0,0,0.06) 0px 12px 12px -6px, rgba(0,0,0,0.06) 0px 24px 24px -12px',
  },
  surface: {
    padding: '48px',
    borderRadius: '15px',
    background: 'rgba(248,249,250,0.9)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  badge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: '#64748b',
    marginBottom: '4px',
  },
  title: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '28px',
    fontWeight: 400,
    lineHeight: '32px',
    letterSpacing: '-0.025em',
    color: '#0f172a',
  },
  subtitle: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#64748b',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px',
    color: '#0f172a',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#0f172a',
    background: '#ffffff',
    border: '0.8px solid #f1f5f9',
    borderRadius: '4px',
    outline: 'none',
    transition: 'border-color 160ms ease',
    boxShadow: 'rgba(0,0,0,0.04) 0px 0px 0px 1px inset',
  },
  inputFocus: {
    borderColor: '#0f172a',
  },
  errorBox: {
    padding: '10px 12px',
    borderRadius: '4px',
    background: 'rgba(254,226,226,0.6)',
    border: '0.8px solid rgba(239,68,68,0.2)',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#991b1b',
  },
  submitBtn: {
    width: '100%',
    padding: '10px 12px',
    fontFamily: 'Inter, sans-serif',
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px',
    color: '#fafafa',
    background: '#0f172a',
    border: '0px solid transparent',
    borderRadius: '0px',
    cursor: 'pointer',
    transition: 'opacity 160ms ease',
    marginTop: '8px',
  },
  submitBtnHover: {
    opacity: 0.85,
  },
  submitBtnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
  divider: {
    height: '0.8px',
    background: '#f1f5f9',
  },
  footer: {
    fontSize: '12px',
    lineHeight: '16px',
    color: '#64748b',
    textAlign: 'center',
  },
}

export default function LoginPage() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    if (!username || !password) {
      setError('Por favor ingrese usuario y contraseña.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const tokens = await loginRequest(username, password)
      login(tokens)
      navigate('/welcome', { replace: true })
    } catch (err) {
      const msg =
        err?.response?.data?.detail ||
        'Credenciales inválidas. Intente nuevamente.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  const btnStyle = {
    ...styles.submitBtn,
    ...(hovering && !loading ? styles.submitBtnHover : {}),
    ...(loading ? styles.submitBtnDisabled : {}),
  }

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.surface}>
          {/* Header */}
          <div style={styles.header}>
            <span style={styles.badge}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Compliance Platform
            </span>
            <h1 style={styles.title}>Iniciar sesión</h1>
            <p style={styles.subtitle}>
              Acceda a su panel con sus credenciales de administrador.
            </p>
          </div>

          <div style={styles.divider} />

          {/* Form */}
          <form onSubmit={handleSubmit} style={styles.form} noValidate>
            <div style={styles.fieldGroup}>
              <label htmlFor="username" style={styles.label}>
                Usuario
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...styles.input,
                  ...(focusedField === 'username' ? styles.inputFocus : {}),
                }}
                placeholder="admin"
                disabled={loading}
              />
            </div>

            <div style={styles.fieldGroup}>
              <label htmlFor="password" style={styles.label}>
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                style={{
                  ...styles.input,
                  ...(focusedField === 'password' ? styles.inputFocus : {}),
                }}
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {error && <div style={styles.errorBox}>{error}</div>}

            <button
              type="submit"
              disabled={loading}
              style={btnStyle}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              {loading ? 'Verificando...' : 'Ingresar'}
            </button>
          </form>

          <div style={styles.divider} />

          <p style={styles.footer}>
            Acceso restringido a usuarios autorizados.
          </p>
        </div>
      </div>
    </div>
  )
}
