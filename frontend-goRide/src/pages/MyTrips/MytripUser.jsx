import React, { useEffect, useState } from "react";
import NavbarUser from "../../Components/NavbarUser/NavbarUser";
import axios from "axios";
import "./MytripUser.css";

const MytripUser = () => {
  const userId = localStorage.getItem("userId");
  const username = localStorage.getItem("username");
  const email = localStorage.getItem("email");
  const phone = localStorage.getItem("phone");

  const [histories, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/auth/userTripsHistory/${userId}`
      );
      setHistory(res.data.history);
    } catch (error) {
      console.error("Failed to fetch trip history", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div className="mytripuser">
      <NavbarUser />
      <h2>Mytrips</h2>
      <div className="tripuser">
        {histories.length > 0 ? (
          histories.map((data, index) =>
            data.ride ? (
              <div key={index} className="left-content">
                <div className="content">
                  <p>
                    <strong>DriverName:</strong> {data.driverName}
                  </p>
                  <p>
                    <strong>Phone No:</strong> {data.driverPhone}
                  </p>
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
            ) : null
          )
        ) : (
          <p>No trips</p>
        )}
      </div>
    </div>
  );
};

export default MytripUser;
