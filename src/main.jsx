import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css'

import Header from './Header.jsx'
import Content from './Content.jsx'
import Navbar from './Navbar.jsx';
import View from './pages/View.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Content />}>
            <Route path='/view' element={<View />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </StrictMode>
  </>
)
