import React from 'react';
import './NavbarUser.css';
import logo from '../../assets/GoRideLogo.png';
import { Link } from 'react-router-dom';

const NavbarUser = () => {
    const userId = !!localStorage.getItem('userId');
    return (
        <div className='navbaruser'>
            <Link to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <ul className="nav-menu">
                {userId && <li><Link to="/user">Home</Link></li>}
                {userId && <li><Link to="/mytripuser">My Trips</Link></li>}
                {!userId && <li><Link to="/userlogin">Login</Link></li>}
                {!userId && <li><Link to="/usersignup">Signup</Link></li>}
                {userId && <li><Link to="/logout">Log Out</Link></li>}

            </ul>
        </div>
    );
}

export default NavbarUser;
