import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import React from 'react'
import App from './App'
import { RootStoreProvider } from './store/RootStoreContext'

createRoot(document.getElementById('root')!).render(
  <RootStoreProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </RootStoreProvider>,
)
