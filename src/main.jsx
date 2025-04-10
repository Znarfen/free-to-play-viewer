import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'

import Header from './Header.jsx'
import Content from './Content.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Header />
    <Content />
  </StrictMode>,
)
