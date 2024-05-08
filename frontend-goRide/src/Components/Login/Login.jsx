import React from 'react'
import './Login.css'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'

import uimg from '../../assets/logindriver-image.png'
import { useState } from 'react'

const Login = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,
        });
    };
    const handleSubmit = async (e) => {

        e.preventDefault();
        console.log()
        const res = await axios.post('http://localhost:5000/api/auth/login', user);
        console.log(res)
        // if (res.data.status === 400) {
        //     alert('invalid')
        // }
        // console.log(res.data)
        if (res.data.token) {

            const { userId, username, email, phone } = res.data.token;


            await localStorage.setItem('userId', userId);
            await localStorage.setItem('username', username);
            await localStorage.setItem('email', email);
            await localStorage.setItem('phone', phone);
            navigate('/user');
        }

    }
    return (
        <div className='login'>
            <section>
                <main>
                    <div className="section-signup">
                        <div className="container grid grid-two-cols">
                            <div className="signup-image">
                                <img src={uimg} alt="" width="500" height="500" />
                            </div>
                            <div className="signup-form">
                                <h1 className='heading mb-3'>Login<hr /></h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' placeholder='Enter Email' id='email' required value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name='password' placeholder='Enter Password' id='password' required value={user.password} onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type='submit' className='btn btn-submit'>Login Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default Login
