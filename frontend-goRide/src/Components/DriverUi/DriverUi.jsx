import React, { useState, useEffect } from "react";
import "./DriverUi.css";
import axios from "axios";
import NavbarDriver from "../NavbarDriver/NavbarDriver";

const DriverUi = () => {
  const [formData, setFormData] = useState({
    name: "",
    licenseNumber: "",
    vehicleModel: "",
    mobileNumber: "",
    age: "",
  });

  const [bookings, setBookings] = useState([]);
  const [submittedData, setSubmittedData] = useState(() => {
    const storedData = localStorage.getItem("driverData");
    return storedData ? JSON.parse(storedData) : null;
  });
  const [formVisible, setFormVisible] = useState(true);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedData(formData);
    localStorage.setItem("driverData", JSON.stringify(formData));

    const res = await axios.post(
      "http://localhost:5000/api/auth/driver",
      formData
    );
    console.log(res.data);
    setFormVisible(false);
  };

  const handleEdit = () => {
    setFormVisible(true);
  };

  const getBookings = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/bookDetails", {
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(res.data.details);
    setBookings(res.data.details);
  };

  const acceptRide = async (id) => {
    console.log(id);

    const res = await axios.put(
      `http://localhost:5000/api/auth/acceptRide/${id}/${formData.name}/${formData.mobileNumber}`
    );
    console.log(res);
    alert("Ride accepted successfully");
    window.location.reload();
  };

  useEffect(() => {
    getBookings();
  }, []);

  return (
    <div className="driverui">
      <NavbarDriver />
      <div className="data-left-container">
        {formVisible && (
          <div className="driver-form">
            <h2>Details</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
              <label>
                License No:
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Vehicle Model:
                <select
                  name="vehicleModel"
                  value={formData.vehicleModel}
                  onChange={handleChange}
                >
                  <option value="">Select Model</option>
                  <option value="AUTO">AUTO</option>
                  <option value="CAR">CAR</option>
                  <option value="MOTO">MOTO</option>
                </select>
              </label>
              <label>
                Phone No:
                <input
                  type="text"
                  name="mobileNumber"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                />
              </label>
              <label>
                Age:
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Save</button>
            </form>
          </div>
        )}
        {submittedData && (
          <div className="driver-details">
            <h2>Driver Details</h2>
            <p>
              <strong>Name:</strong> {submittedData.name}
            </p>
            <p>
              {" "}
              <strong>License Number:</strong> {submittedData.licenseNumber}
            </p>
            <p>
              <strong>Vehicle Model:</strong> {submittedData.vehicleModel}
            </p>
            <p>
              <strong>Mobile Number:</strong> {submittedData.mobileNumber}
            </p>
            <p>
              <strong>Age:</strong> {submittedData.age}
            </p>
            <button onClick={handleEdit}>Edit</button>
          </div>
        )}
      </div>
      <div className="data-right-container">
        <h2>Ride Requests</h2>
        {bookings.map(
          (item) =>
            !item.ride && (
              <div
                className="request-item"
                key={item._id}
                style={{ marginBottom: 30 }}
              >
                <div className="request-items">
                  <div className="user">
                    <p>
                      <strong>UserName:</strong> {item.username}
                    </p>
                    <p>
                      <strong>Phone No:</strong> {item.phone}
                    </p>
                    <p>
                      <strong>Pickup:</strong> {item.source}
                    </p>
                    <p>
                      <strong>DropOff:</strong> {item.destination}
                    </p>
                    <button type="button" onClick={() => acceptRide(item._id)}>
                      Accept ride
                    </button>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default DriverUi;
