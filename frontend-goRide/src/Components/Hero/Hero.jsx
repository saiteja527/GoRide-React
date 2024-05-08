import React from 'react'
import './Hero.css'
import heroimg from '../../assets/imaggg1.png'
import { Link } from 'react-router-dom'

const Hero = () => {
    return (
        <div className='hero'>
            <div className="hero-container">
                <div className="left-container">
                    <div className="hero-header">
                        <h2>Request a ride now with GoRide.</h2>
                        <p>Request a ride, hop in, and go.</p>
                    </div>
                    <div className="hero-middle">
                        <input type="text" placeholder='Enter the Pickup Point' />
                        <input type="text" placeholder='Enter the Destination Point' />
                    </div>
                    <div className="request-btn">
                        <button><Link to="/user" >Request Now</Link></button>
                    </div>
                </div>
                <div className="hero-right">
                    <img src={heroimg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Hero
