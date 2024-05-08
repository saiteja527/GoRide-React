import React, { useEffect, useState } from 'react'
import NavbarUser from '../../Components/NavbarUser/NavbarUser'
import axios from 'axios'
// import { jwtDecode } from "jwt-decode";
import './MytripUser.css'

import Data from '../../assets/data'

const MytripUser = () => {

    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    const phone = localStorage.getItem("phone");
    // var decodedToken = jwtDecode(Token);
    // console.log(decodedToken)

    const [histories, setHistory] = useState([]);

    const getHistory = async () => {
        //6639f2941a8b0ffe25b34024
        //console.log(id)
        //console.log(decodedToken)
        const res = await axios.get(`http://localhost:5000/api/auth/userTripsHistory/${userId}`);
        console.log(res.data.history);
        setHistory(res.data.history);
    }


    useEffect(() => {
        getHistory();
    }, [])

    return (
        <div className='mytripuser'>
            <NavbarUser />
            <h2>Mytrips</h2>
            <div className='tripuser'>
                {histories.map((data, index) => (
                    data.ride ? (
                        <div key={index} className="left-content">
                            <div className="content">
                                <p><strong>DriverName:</strong> {data.driverName}</p>
                                <p><strong>Phone No:</strong> {data.phone}</p>
                            </div>
                            <div className="content1">
                                <p><strong>From:</strong> {data.source}</p>
                                <p><strong>To:</strong>{data.destination}</p>
                                {/* <p><strong>Cost:</strong> {data.s_no}</p> */}
                            </div>
                        </div>
                    ) : <></>
                ))}
            </div >
        </div >
    )
}

export default MytripUser
