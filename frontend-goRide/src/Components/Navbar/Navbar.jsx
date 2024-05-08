import React from 'react'
import './Navbar.css'
import logo from '../../assets/GoRideLogo.png'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const token = !!localStorage.getItem('Usertoken');
    return (
        <div className='navbar'>
            <img src={logo} alt="" />
            <ul className="nav-menu">
                <li><Link to="/">Home</Link></li>
                <li>
                    {token ? (
                        <Link to="/user">Let's Ride</Link>
                    ) : (
                        <Link to="/userlogin">Let's Ride</Link>
                    )}
                </li>
                <li><Link to="/driver" >Let's Drive</Link></li>
            </ul>
        </div >
    )
}

export default Navbar
