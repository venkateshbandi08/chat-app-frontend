import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Header from "../navbar";
import { store } from "../../App";
import { MdOutlineWavingHand } from "react-icons/md";
import "./index.css";
import baseUrl from "../url";

const MyProfile = () => {
  const [isLoggedIn, setLoggedInUserDetails] = useContext(store);
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const currToken = localStorage.getItem("token");

  useEffect(() => {
    if (!currToken) {
      alert("Login to proceed !");
      navigate("/login", { replace: true });
      return;
    }

    const getProfileDetails = async () => {
      try {
        const response = await axios.get(`${baseUrl}/myprofile`, {
          headers: {
            "x-token": currToken,
          },
        });
        setUserDetails(response.data);
        setLoggedInUserDetails(response.data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        alert("Error in login!");
        navigate("/login", { replace: true });
      }
    };
    getProfileDetails();
  }, [currToken, navigate, setLoggedInUserDetails]);

  console.log(userDetails); // Now you should see userDetails in the console

  return (
    <div className="whole-myprofile-container">
      <Header />
      {isLoading ? (
        <div className="loader-container">
          <Loader
            type="ThreeDots"
            color="black"
            height={50}
            width={50}
            timeout={0} // No timeout
          />
        </div>
      ) : (
        userDetails && (
          <div className="myprofile-container">
            <h1 className="welcome-heading">
              <div className="wave-icon-container">
                <MdOutlineWavingHand className="wave-icon" />
              </div>
              <br />
              Hey "
              <span className="profile-username"> {userDetails.userName} </span>
              " Welcome
            </h1>
            <Link to="/group-chat">
              <button className="btn btn-success">Go to your Group-Chat</button>
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default MyProfile;
