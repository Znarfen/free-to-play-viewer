import Content from './Content.jsx'
import Navbar from './Navbar.jsx';
import View from './pages/View.jsx'
import Footer from './Footer.jsx'

import { createContext, useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const themeContext = createContext();

export function App() {

    const [theme, setTheme] = useState('purple');

    const changeBg = (color) => {
        if (color == "main") {
            document.documentElement.style.setProperty('--bg', 'rgb(42, 30, 49)');
            document.documentElement.style.setProperty('--primary', 'rgb(23, 23, 23)');
            document.documentElement.style.setProperty('--secondary', 'rgb(220, 220, 220)');
            document.documentElement.style.setProperty('--active', 'rgb(119, 89, 121)');
        }
        else if (color == "paper") {
            document.documentElement.style.setProperty('--bg', 'rgb(85, 83, 64)');
            document.documentElement.style.setProperty('--primary', 'rgb(153, 134, 78)');
            document.documentElement.style.setProperty('--secondary', 'rgb(182, 182, 182)');
            document.documentElement.style.setProperty('--active', 'rgb(112, 114, 40)');
        }
        else if (color == "water") {
            document.documentElement.style.setProperty('--bg', 'rgb(0, 152, 187)');
            document.documentElement.style.setProperty('--primary', 'rgb(11, 0, 73)');
            document.documentElement.style.setProperty('--secondary', 'rgb(255, 255, 255)');
            document.documentElement.style.setProperty('--active', 'rgb(0, 95, 113)');
        }
    };

    useEffect(() => {
        changeBg(theme);
    }, [theme]);

    return (
        <themeContext.Provider value={{ theme, setTheme }}>
            <Navbar />
            <BrowserRouter>
            <Routes>
                <Route exact path='/' element={<Content />}>
                    <Route path='/:id' element={<View />} />
                </Route>
            </Routes>
            </BrowserRouter>
            <Footer />
        </themeContext.Provider>
    );
}