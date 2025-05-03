import './App.css'
import { Outlet, Link } from "react-router-dom";

function Navbar() {
    return (
        <>
            <nav>
                <Link to="/games">Games</Link>
                <Link to="/saved">Saved</Link>
                <hr></hr>
            </nav>
            
            <Outlet />
        </>
  )
}

export default Navbar
