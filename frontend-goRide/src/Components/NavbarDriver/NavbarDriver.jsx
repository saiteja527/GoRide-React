import React from 'react'
import './NavbarDriver.css'
import logo from '../../assets/GoDriveLogo.png'
import { Link } from 'react-router-dom'

const NavbarDriver = () => {
    return (
        <div className='navbardriver'>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <ul className="nav-menu">
                <li><Link to="/driver">Home</Link></li>
                <li><Link to="/mytripdriver" >My Drive's</Link></li>
            </ul>
        </div>
    )
}

export default NavbarDriver
