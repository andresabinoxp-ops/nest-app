import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null, info: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    this.setState({ info })
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: 600, margin: '0 auto', minHeight: '100dvh' }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Something broke</h1>
          <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
            Send this to whoever's debugging:
          </p>
          <pre style={{ fontSize: 12, background: '#f3f3f3', padding: 12, borderRadius: 8, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {String(this.state.error?.stack || this.state.error)}
          </pre>
          {this.state.info?.componentStack && (
            <pre style={{ fontSize: 11, background: '#fafafa', padding: 12, borderRadius: 8, overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word', marginTop: 12 }}>
              {this.state.info.componentStack}
            </pre>
          )}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
            <button onClick={() => location.reload()} style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, border: 'none', borderRadius: 10, background: '#2E8B88', color: '#fff', cursor: 'pointer' }}>
              Reload
            </button>
            <button onClick={() => { try { localStorage.clear() } catch {}; location.reload() }} style={{ padding: '12px 16px', fontSize: 14, fontWeight: 600, border: '1px solid #ddd', borderRadius: 10, background: '#fff', color: '#111', cursor: 'pointer' }}>
              Reset app data
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
