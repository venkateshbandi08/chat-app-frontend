import React, { useState, createContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import Chat from "./components/chat";
import MyProfile from "./components/myProfile";
import "./App.css";

export const store = createContext();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [loggedInuserDetails, setLoggedInUserDetails] = useState({});
  // console.log(loggedInuserDetails);
  return (
    <store.Provider value={[isLoggedIn, setIsLoggedIn]}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/myprofile"
            element={isLoggedIn ? <MyProfile /> : <Navigate to="/" />}
          />
          <Route
            exact
            path="/group-chat"
            element={isLoggedIn ? <Chat /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </store.Provider>
  );
};

export default App;
