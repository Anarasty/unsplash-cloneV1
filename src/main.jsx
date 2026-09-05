import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import AuthProvider from './context/AuthProvider.jsx'

const navigationEntry = performance.getEntriesByType('navigation')[0]

if (navigationEntry?.type === 'reload' && window.location.pathname.startsWith('/tags/')) {
  window.history.replaceState(null, '', '/')
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
