import React, { useState, useEffect } from "react";
import "./Login.css";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import uimg from "../../assets/logindriver-image.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import jwt_decode from "jwt-decode";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: localStorage.getItem("email") || "",
    password: localStorage.getItem("password") || "",
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
    localStorage.setItem(name, value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        user
      );
      if (res.data.token) {
        const decoded = jwt_decode(res.data.token);
        const { userId, username, email, phone } = decoded;
        localStorage.setItem("userId", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("email", email);
        localStorage.setItem("phone", phone);
        navigate("/user");
        toast.success("User logged in successfully")
      }
    } catch (error) {
      console.log(error)
      toast.error("Login failed. Please check your credentials and try again.");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
  }, []);

  return (
    <div className="login">
      <ToastContainer />
      <section>
        <main>
          <div className="section-signup">
            <div className="container grid grid-two-cols">
              <div className="signup-image">
                <img src={uimg} alt="Login" width="500" height="500" />
              </div>
              <div className="signup-form">
                <h1 className="heading mb-3">
                  Login
                  <hr />
                </h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      id="email"
                      required
                      value={user.email}
                      onChange={handleInput}
                    />
                  </div>
                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      id="password"
                      required
                      value={user.password}
                      onChange={handleInput}
                    />
                  </div>
                  <br />
                  <button type="submit" className="btn btn-submit">
                    Login Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </div>
  );
};

export default Login;
