import React, { useContext, useState } from "react";
import "reactjs-popup/dist/index.css";
import { Link, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { store } from "../../App";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  const [, setIsLoggedIn] = useContext(store);
  const navigate = useNavigate();
  // const logout = () => {
  //   localStorage.removeItem("token");
  //   setIsLoggedIn(false);
  //   toast.success('Logged out !')
  //   navigate("/", { replace: true });
  // };

  const [logoutConfirmationShow, setLogoutConfirmationShow] = useState(false);

  const toggleLogoutConfirmation = () => {
    setLogoutConfirmationShow(!logoutConfirmationShow);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out !");
    <ToastContainer />;
    toggleLogoutConfirmation();
    navigate("/", { replace: true });
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container>
        <Link style={{ textDecoration: "none" }}>
          <Navbar.Brand
            className="brand-hover"
            style={{
              border: "1px solid green",
              paddingLeft: "5px",
              paddingRight: "5px",
              borderRadius: "3px",
            }}
          >
            Frnds-Chat
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <button
              className="nav-link brand-hover"
              onClick={toggleLogoutConfirmation}
            >
              <FaUser /> Logout
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      {/* logout confirmation model */}
      <Modal
        show={logoutConfirmationShow}
        onHide={toggleLogoutConfirmation}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to Logout ? </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleLogoutConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </Navbar>
  );
};

export default Header;
