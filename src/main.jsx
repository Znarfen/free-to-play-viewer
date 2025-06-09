import { createContext, StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import './index.css'
import { App } from './App';

// <FavoritesContext.provider value={[]}>
createRoot(document.getElementById('root')).render(
  <>
    <StrictMode>
      <App />
    </StrictMode>
  </>
)
