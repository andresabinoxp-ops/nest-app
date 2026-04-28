import { StrictMode, Component } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const BUILD_TAG = 'v63-debug'

// Show a visible overlay for ANY error: render crashes, event-handler throws,
// unhandled promise rejections. The boundary alone misses non-render errors,
// and a white screen tells us nothing.
function showFatal(label, err) {
  try {
    let host = document.getElementById('__fatal_overlay__')
    if (!host) {
      host = document.createElement('div')
      host.id = '__fatal_overlay__'
      host.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#fff;color:#111;padding:24px;font:12px/1.45 system-ui,sans-serif;overflow:auto;-webkit-overflow-scrolling:touch'
      document.body.appendChild(host)
    }
    const stack = (err && (err.stack || err.message)) || String(err)
    const block = document.createElement('div')
    block.style.cssText = 'margin-bottom:16px;border:1px solid #eee;border-radius:8px;padding:12px;background:#fafafa'
    block.innerHTML = `<div style="font-weight:700;margin-bottom:6px;color:#b00020">${label} · ${BUILD_TAG}</div><pre style="white-space:pre-wrap;word-break:break-word;margin:0;font-size:11px">${escapeHtml(stack)}</pre>`
    host.appendChild(block)
    if (!document.getElementById('__fatal_actions__')) {
      const actions = document.createElement('div')
      actions.id = '__fatal_actions__'
      actions.style.cssText = 'position:sticky;bottom:0;background:#fff;padding-top:12px;display:flex;gap:8px;flex-wrap:wrap'
      actions.innerHTML = `
        <button id="__fatal_reload__" style="padding:10px 14px;border:none;border-radius:8px;background:#2E8B88;color:#fff;font-weight:600">Reload</button>
        <button id="__fatal_reset__" style="padding:10px 14px;border:1px solid #ddd;border-radius:8px;background:#fff;color:#111;font-weight:600">Reset app data</button>`
      host.appendChild(actions)
      document.getElementById('__fatal_reload__').onclick = () => location.reload()
      document.getElementById('__fatal_reset__').onclick = () => {
        try { localStorage.clear() } catch {}
        location.reload()
      }
    }
  } catch {}
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

window.addEventListener('error', (e) => {
  showFatal('window.onerror', e.error || e.message || e)
})
window.addEventListener('unhandledrejection', (e) => {
  showFatal('unhandledrejection', e.reason || e)
})

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
    showFatal('React render error', error)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', maxWidth: 600, margin: '0 auto', minHeight: '100dvh' }}>
          <div style={{ fontSize: 11, color: '#888', marginBottom: 8 }}>Build {BUILD_TAG}</div>
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

// Tiny build badge so we can confirm the latest bundle is actually running.
function mountBuildBadge() {
  const el = document.createElement('div')
  el.textContent = BUILD_TAG
  el.style.cssText = 'position:fixed;left:6px;bottom:6px;z-index:9998;font:10px/1 system-ui,sans-serif;color:#999;background:rgba(255,255,255,0.6);padding:2px 6px;border-radius:6px;pointer-events:none'
  document.body.appendChild(el)
}
mountBuildBadge()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
)
