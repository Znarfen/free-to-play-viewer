import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function Header() {
    const [count, setCount] = useState(0)
    return (
        <>
            <h1>Free To Play Viewer</h1>
            <h2>Znarfen</h2>
        </>
  )
}

export default Header
