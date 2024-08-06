import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Logout = () => {
    const navigate = useNavigate();
    localStorage.removeItem('Usertoken');
    // setAuthentication(false);
    useEffect(() => {
        const handleLogout = async () => {
            // Remove the token from local storage
            await localStorage.removeItem('userId');
            await localStorage.removeItem('username');
            await localStorage.removeItem('email');
            await localStorage.removeItem('phone');
            await localStorage.removeItem("password");
            // Redirect to the login page or any other desired page
            navigate('/userlogin');
        };

        handleLogout();
        toast.success('Logged Out Successfully',)
        
    }, [navigate]);
    return null;
}

export default Logout