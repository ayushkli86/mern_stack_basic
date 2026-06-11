import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Address from './assets/Address.jsx'
import "./global.css";
import CosmosApp from './CosmosApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <CosmosApp></CosmosApp>
  </StrictMode>,
)
