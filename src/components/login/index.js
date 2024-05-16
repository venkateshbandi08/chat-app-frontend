import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { store } from "../../App.js";
import "./index.css";
import baseUrl from "../url.js";

const Login = () => {
  const [, setIsLoggedIn] = useContext(store);
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(null); // State for displaying error messages
  const navigate = useNavigate();

  const onChangeInput = (event) => {
    setLoginDetails({
      ...loginDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/login`, loginDetails);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        navigate("/myprofile", { replace: true });
      } else {
        setError("Invalid email or password"); // Set error message
      }
    } catch (err) {
      setError("Provide valid credentials !"); // Set error message
    }
  };

  const handleIsChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="login-container">
      <form className="login-form-container" onSubmit={onHandleLogin}>
        <h2 className="login-heading">Login</h2>
        <div className="form-input-field">
          <label>Email</label>
          <input type="email" name="email" onChange={onChangeInput} />
        </div>
        <div className="form-input-field">
          <label>Password</label>
          <input
            type={isChecked ? "text" : "password"}
            name="password"
            onChange={onChangeInput}
          />
        </div>
        <div className="login-check-box-container">
          <input
            type="checkbox"
            id="login-show-password"
            onChange={handleIsChecked}
          />
          <label
            htmlFor="login-show-password"
            className="login-show-password-text"
          >
            show password
          </label>
        </div>
        <div className="login-button-container">
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </div>
        {error && <p className="error-message">{error}</p>}{" "}
        {/* Display error message if exists */}
        <p className="register-here">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
