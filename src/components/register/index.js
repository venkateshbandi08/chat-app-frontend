import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./index.css";
import baseUrl from "../url";

const Register = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(""); // State for displaying error message
  const [successMessage, setSuccessMessage] = useState(""); // State for displaying success message
  const [isChecked, setIsChecked] = useState(false);

  const onChangeInput = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const onHandleUserDetails = async (event) => {
    event.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/register`, userDetails);
      setSuccessMessage(response.data);
      setError("");
      // setUserDetails({
      //   userName: "",
      //   email: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred. Provide valid details !");
    }
  };
  const navigate = useNavigate();
  const onClickLoginButton = (event) => {
    event.preventDefault();
    navigate("/login", { replace: true });
  };

  const handleIsChecked = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className="register-container">
      <form className="register-form-container" onSubmit={onHandleUserDetails}>
        <h2 className="register-heading">Register</h2>
        <div className="form-input-field">
          <label>Enter your name</label>
          <input
            type="text"
            name="userName"
            value={userDetails.userName}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-input-field">
          <label>Enter your email</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={onChangeInput}
          />
        </div>
        <div className="form-input-field">
          <label>Enter your password</label>
          <input
            type={isChecked ? "text" : "password"}
            name="password"
            value={userDetails.password}
            onChange={onChangeInput}
          />
        </div>
        <div className="register-check-box-container">
          <input
            type="checkbox"
            id="register-show-password"
            onChange={handleIsChecked}
          />
          <label
            htmlFor="register-show-password"
            className="register-show-password-text"
          >
            show password
          </label>
        </div>
        <div className="form-input-field">
          <label>Confirm your password</label>
          <input
            type="password"
            name="confirmPassword"
            value={userDetails.confirmPassword}
            onChange={onChangeInput}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && (
          <div>
            <p className="success-message">{successMessage}</p>
            <p className="success-message"> Now you can login !</p>
            <div className="login-button-container">
              <button
                className="btn btn-primary"
                style={{ marginBottom: "10px" }}
                onClick={onClickLoginButton}
              >
                Login
              </button>
            </div>
          </div>
        )}
        <div className="registration-submit-button">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
