import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ActivityDataProvider } from './context/activityData'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ActivityDataProvider>
      <App />
    </ActivityDataProvider>
  </React.StrictMode>,
)
