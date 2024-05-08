import React from 'react'
import axios from 'axios'
import { NavLink, useNavigate } from 'react-router-dom'
import './Signup.css'
import simg from '../../assets/signupdriver-image.png'
import { useState } from 'react'

const Signup = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleInput = (e) => {
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user)
        const res = await axios.post('http://localhost:5000/api/auth/register', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(res.data)
        navigate('/userlogin');
    }
    return (
        <div>
            <section className='signup'>
                <main>
                    <div className="section-signup">
                        <div className="container grid grid-two-cols">
                            <div className="signup-image">
                                <img src={simg} alt="" width="400" height="400" />
                            </div>
                            <div className="signup-form">
                                <h1 className='heading mb-3'>Sign Up<hr /></h1>
                                <br />
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label htmlFor="username">Username</label>
                                        <input type="text" name='username' placeholder='Enter Username' id='username' required value={user.username} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" name='email' placeholder='Enter Email' id='email' required value={user.email} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="phone">Phone No</label>
                                        <input type="number" name='phone' placeholder='Enter Phone no' id='phone' required value={user.phone} onChange={handleInput} />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" name='password' placeholder='Enter Password' id='password' required value={user.password} onChange={handleInput} />
                                    </div>
                                    <br />
                                    <button type='submit' className='btn btn-submit'>SignUp Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </div>
    )
}

export default Signup
