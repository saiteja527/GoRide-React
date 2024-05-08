import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('Usertoken');
    // setAuthentication(false);
    useEffect(() => {
        alert('Do you want to LOGOUT')
        const handleLogout = async () => {
            // Remove the token from local storage
            await localStorage.removeItem('userId');
            await localStorage.removeItem('username');
            await localStorage.removeItem('email');
            await localStorage.removeItem('phone');

            // Redirect to the login page or any other desired page
            navigate('/');
        };

        handleLogout();
    }, [navigate]);
    return null;
}

export default Logout