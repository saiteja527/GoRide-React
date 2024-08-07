import React, { useEffect, useState } from "react";
import NavbarDriver from "../../Components/NavbarDriver/NavbarDriver";
import axios from "axios";
import "./MytripDriver.css";
import { PiUserCircleCheckFill } from "react-icons/pi";

const MytripDriver = () => {
  const [bookings, setBookings] = useState([]);

  const getBookings = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/bookDetails",
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setBookings(res.data.details);
    } catch (error) {
      console.error("Failed to fetch booking details", error);
    }
  };

  useEffect(() => {
    getBookings();
  }, []);

  useEffect(() => {
    const handleWindowClose = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleWindowClose);

    return () => {
      window.removeEventListener("beforeunload", handleWindowClose);
    };
  }, []);

  return (
    <div className="mytripdriver">
      <NavbarDriver />
      <div className="tripdriver">
        <h2>My Drives</h2>
        {bookings.length > 0 ? (
          bookings.map(
            (data, index) =>
              data.ride && (
                <div key={index} className="left-content">
                  <div className="content">
                    <PiUserCircleCheckFill size={30} />
                    <h1>{data.username}</h1>
                    <p>PhoneNo: {data.phone}</p>
                  </div>
                  <div className="content1">
                    <p>
                      <strong>From:</strong> {data.source}
                    </p>
                    <p>
                      <strong>To:</strong> {data.destination}
                    </p>
                  </div>
                </div>
              )
          )
        ) : (
          <p>No trips</p>
        )}
      </div>
    </div>
  );
};

export default MytripDriver;
