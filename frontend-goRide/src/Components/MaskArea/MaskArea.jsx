import React from 'react'
import './MaskArea.css'
import maskimg from '../../assets/img5.jpg'

const MaskArea = () => {
    return (
        <div className='maskarea'>
            <div className="maskarea-container">
                <div className="maskarea-content">
                    <div className="maskarea-contents">
                        <h2>The GoRide. you know, reimagined for business</h2>
                        <p>A platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
                        <div className="maskarea-btn">
                            <button>Get Started</button>
                        </div>
                    </div>
                </div>
                <div className="maskareaimg">
                    <img src={maskimg} alt="" />
                </div>
            </div>
        </div>
    )
}

export default MaskArea
