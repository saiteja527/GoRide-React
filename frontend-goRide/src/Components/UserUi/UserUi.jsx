import React, { useState, useEffect } from 'react';
import './UserUi.css';
import axios from 'axios';
import NavbarUser from '../NavbarUser/NavbarUser';
import Data from '../../assets/data';
import GoogleMap from '../Maps';
import PlacesAutocomplete from '../PlacesAutocomplete';

const UserUi = () => {

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const phone = localStorage.getItem("phone");

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [showDiv, setShowDiv] = useState(false);
    const [origin, setOrigin] = useState(null);
    const [destination, setDestination] = useState(null);
    const [timerActive, setTimerActive] = useState(false);
    const [remainingTime, setRemainingTime] = useState(90);
    const [distance, setDistance] = useState(0);
    const [timerCompleted, setTimerCompleted] = useState(false);

    useEffect(() => {
        let interval;
        if (timerActive) {
            interval = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime === 0) {
                        setTimerActive(false);
                        clearInterval(interval);
                        alert('No rides accepted');
                        setTimerCompleted(true);
                        return 90;
                    } else {
                        return prevTime - 1;
                    }
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [timerActive]);

    useEffect(() => {
        if (timerCompleted) {
            setShowDiv(false);
        }
    }, [timerCompleted]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const calculateDistance = () => {
        if (origin && destination) {
            const { lat: lat1, lng: lon1 } = origin;
            const { lat: lat2, lng: lon2 } = destination;

            const R = 6371;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distanceInKm = R * c;

            setDistance(distanceInKm);
            Data.forEach(item => {
                switch (item.s_head) {
                    case "Auto":
                        item.s_no = `₹${Math.round(distanceInKm * 20)}`;
                        break;
                    case "Moto":
                        item.s_no = `₹${Math.round(distanceInKm * 10)}`;
                        break;
                    case "Car":
                        item.s_no = `₹${Math.round(distanceInKm * 40)}`;
                        break;
                    default:
                        break;
                }
            });
        }
    }

    const handleClick = () => {
        if (input1.trim() !== '' && input2.trim() !== '') {
            setShowDiv(true);
            calculateDistance();
        } else {
            setShowDiv(false);
        }
    };

    const handleOriginSelect = ({ address, latLng }) => {
        setInput1(address);
        setOrigin(latLng);
    };

    const handleDestinationSelect = ({ address, latLng }) => {
        setInput2(address);
        setDestination(latLng);
    };

    const handleBookRide = async () => {
        const res = await axios.post('http://localhost:5000/api/auth/book', {
            username: username,
            phone: phone,
            clientId: userId,
            source: input1,
            destination: input2,
        });
        console.log(res.data);
        setTimerActive(true);
        alert('Ride booked!');
    };

    return (
        <div className='userui'>
            <NavbarUser />
            <div className="left">
                <div className="left-container">
                    <div className="header">
                        <h2>Get a Ride</h2>
                    </div>
                    <div className="userinputs">
                        <div className="pickup">
                            <PlacesAutocomplete placeholder='Pickup Location' onSelect={handleOriginSelect} />
                        </div>
                        <div className="destin">
                            <PlacesAutocomplete placeholder='Dropoff Location' onSelect={handleDestinationSelect} />
                        </div>
                    </div>
                    <div className="searchbtn">
                        <button onClick={handleClick}>Search</button>
                    </div>
                </div>
                {showDiv && (
                    <div className="left-container1">
                        {Data.map((data, index) => (
                            <div key={index} className="left-cnt">
                                <div className="imga">
                                    <img src={data.s_img} alt="" />
                                </div>
                                <div className="cnt">
                                    <h1>{data.s_head}</h1>
                                    <p>{`Distance: ${distance.toFixed(2)}km`}</p>
                                    <p>{data.s_name}</p>
                                    <li>{data.s_time}</li>
                                </div>
                                <div className="money">
                                    <h2><span style={{ fontSize: "10px" }}>Cost:</span>{data.s_no}</h2>
                                    <button onClick={handleBookRide}>Book Ride</button>
                                    {timerActive && <p style={{ minWidth: "100px" }}>Time: {formatTime(remainingTime)}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="right-container">
                <GoogleMap origin={origin} destination={destination} />
            </div>
        </div >
    );
};

export default UserUi;
