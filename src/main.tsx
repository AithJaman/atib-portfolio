import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { DarkModeProvider } from '@/contexts/DarkModeContext'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <DarkModeProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </DarkModeProvider>
    </HashRouter>
  </StrictMode>,
)
