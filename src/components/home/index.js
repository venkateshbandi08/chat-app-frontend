import React from "react";
import { Link } from "react-router-dom";
import { IoChatbubblesSharp } from "react-icons/io5";
import "./index.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content-container">
        <div className="main-heading-container">
          <IoChatbubblesSharp className="group-chat-icon" />
          <h1> Group-chat</h1>
        </div>
        <p className="home-paragraph-element"> Have you Registered ? </p>
        <Link to="/register">
          <button className="btn btn-success" style={{ marginBottom: "20px" }}>
            Register
          </button>
        </Link>
        <p className="home-paragraph-element">
          Already Registered please Login yourself !
        </p>
        <Link to="/login">
          <button className="btn btn-primary"> Login </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
