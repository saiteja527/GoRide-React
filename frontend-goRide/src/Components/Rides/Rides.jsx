import React from 'react'
import './Rides.css'
import autoimg from '../../assets/autoimg.png'
import motoimg from '../../assets/motoimg.png'
import carimg from '../../assets/carimg.png'
import arrow from '../../assets/arrow_icon.svg'

const Rides = () => {
    return (
        <div className='rides'>
            <div className="ride-header">
                <h2>Ride with GoRide.</h2>
            </div>
            <div className="rides-container">
                <div className="ride-auto">
                    <img src={autoimg} alt="" />
                    <div className="ridecnt">
                        <h3>GoRide. Auto</h3>
                        <p>Get affordable GoRide. Auto ride with no
                            haggling. Request GoRide. Auto and ride
                            comfortably around your city.</p>
                    </div>
                    <div className="arrowimg">
                        <img src={arrow} alt="" className='arrow' />
                    </div>
                </div>
                <div className="ride-moto">
                    <img src={motoimg} alt="" />
                    <div className="ridecnt">
                        <h3>GoRide. Moto</h3>
                        <p>Get affordable  bike rides at your doorstep.
                            Skip the crowd and zip through traffic
                            with GoRide Moto.</p>
                    </div>
                    <div className="arrowimg">
                        <img src={arrow} alt="" className='arrow' />
                    </div>
                </div>
                <div className="ride-car">
                    <img src={carimg} alt="" />
                    <div className="ridecnt">
                        <h3>GoRide. Car</h3>
                        <p>Book Intercity to head  outstation anytime
                            in convenient and affordable cars.</p>
                    </div>
                    <div className="arrowimg">
                        <img src={arrow} alt="" className='arrow' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rides
