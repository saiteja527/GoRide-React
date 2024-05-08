import React from 'react'
import './Driver.css'
import sideimg from '../../assets/imggg2.gif'
import sideimg1 from '../../assets/imggg3.gif'

const Driver = () => {
    return (
        <div className='driver'>
            <div className="driver-container">
                <div className="driver-left">
                    <img src={sideimg} alt="" />
                </div>
                <div className="driver-right">
                    <h1>Drive when you want, make what you need</h1>
                    <p>Make money on your schedule with deliveries or rides—or both. You can use your own car or choose a rental through GoRide.</p>
                    <div className="driver-signup">
                        <button>Get started</button>
                    </div>
                </div>
            </div>
            <div className="driver-container1">
                <div className="driver1-left">
                    <h1>The GoRide. you know, reimagined for business</h1>
                    <p>GoRide. for Business is a platform for managing global rides and meals, and local deliveries, for companies of any size.</p>
                    <div className="driver1-signup">
                        <button>Get started</button>
                    </div>
                </div>
                <div className="driver1-right">
                    <img src={sideimg1} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Driver
