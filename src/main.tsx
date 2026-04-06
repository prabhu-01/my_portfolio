import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// Always start at the top on load/reload.
// Strip any hash from the URL so the browser doesn't jump to an anchor,
// then force scroll position to 0 before React mounts.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
if (window.location.hash) {
  history.replaceState(null, '', window.location.pathname + window.location.search)
}
window.scrollTo(0, 0)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
