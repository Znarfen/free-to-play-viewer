import { useContext } from 'react'
import { themeContext } from './App.jsx';
import './Navbar.css'

function Navbar() {
    const theme = useContext(themeContext);

    return (
    <>
        <nav>
            <div className='theme-togle'>
                <div>
                    <button id='main' className='theme-btn' onClick={() => theme.setTheme('main')}></button>
                </div>

                <div>
                    <button id='paper' className='theme-btn' onClick={() => theme.setTheme('paper')}></button>
                </div>
                
                <div>
                    <button id='water' className='theme-btn' onClick={() => theme.setTheme('water')}></button>
                </div>
            </div>

            <a href="/"><h1>Free To Play Viewer</h1></a>
            <hr />
        </nav>
    </>
    );
}

export default Navbar
