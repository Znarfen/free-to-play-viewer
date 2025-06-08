import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css'
import './index.css'

import Content from './Content.jsx'
import Navbar from './Navbar.jsx';
import View from './pages/View.jsx'
import Footer from './Footer.jsx'

createRoot(document.getElementById('root')).render(
  <>
    <StrictMode>
      <Navbar />
      <BrowserRouter>
        <Routes>

          <Route exact path='/' element={<Content />}>
            <Route path='/:id' element={<View />} />
          </Route>

        </Routes>
      </BrowserRouter>
      <Footer />
    </StrictMode>
  </>
)
