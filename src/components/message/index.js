import React, { useContext, useRef, useEffect, useState } from "react";
import "./index.css";
import moment from "moment-timezone";
import { store } from "../../App";
import { SlOptionsVertical } from "react-icons/sl";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { IoCheckmarkDone } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";
import baseUrl from "../url";

const Message = (props) => {
  const [loggedInuserDetails] = useContext(store);
  const { messageDetails, setMessagesData } = props;
  const { _id, data, user, userName, text } = messageDetails;
  let initialLetter = userName[0];

  const convertedDate = () => {
    const currDate = data;
    const date = new Date(currDate);
    const formattedDate = date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  };

  const formattedTime = (dateTimeString) => {
    const ISTTime = moment(dateTimeString)
      .tz("Asia/Kolkata")
      .format("hh:mm:ss A");
    return ISTTime;
  };

  const checkIsLoggedInUserOrNot = () => {
    return loggedInuserDetails._id === user
      ? "loggedin-chat-container"
      : "chat-container";
  };

  // Ref to keep track of the currently open popover
  const popoverRef = useRef(null);

  // Function to close the popover when clicking outside of it
  const handleClickOutside = (event) => {
    if (popoverRef.current && !popoverRef.current.contains(event.target)) {
      // Click is outside the popover, close it
      setPopoverOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // State to manage popover open/close
  const [popoverOpen, setPopoverOpen] = useState(false);

  // State to manage edit modal visibility and message text
  const [editModalShow, setEditModalShow] = useState(false);
  const [editedText, setEditedText] = useState(text);

  // State to manage delete confirmation modal visibility
  const [deleteConfirmationShow, setDeleteConfirmationShow] = useState(false);

  // Function to toggle edit modal open/close
  const toggleEditModal = () => {
    setEditModalShow(!editModalShow);
  };

  // Function to toggle delete confirmation modal open/close
  const toggleDeleteConfirmation = () => {
    setDeleteConfirmationShow(!deleteConfirmationShow);
  };

  const getToast = (toastText) => toast.success(toastText);

  // Function to handle edit message
  const handleEditMessage = async () => {
    try {
      // Perform the edit message functionality
      await axios.put(
        `${baseUrl}/allmessages/edit/${_id}`,
        { text: editedText },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );

      // Update the messagesData state with the edited message
      setMessagesData((prevMessagesData) => {
        return prevMessagesData.map((message) => {
          if (message._id === _id) {
            return { ...message, text: editedText };
          } else {
            return message;
          }
        });
      });

      toggleEditModal(); // Close the modal after editing
      // toast.success("Message edited successfully");
      getToast("Message Edited Successfully");
      // <Toaster position="bottom-center" reverseOrder={false} />;
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  // Function to handle delete message
  const handleDeleteMessage = async () => {
    try {
      // Perform the delete message functionality
      await axios.delete(`${baseUrl}/allmessages/delete/${_id}`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });

      // Update the messagesData state by filtering out the deleted message
      setMessagesData((prevMessagesData) => {
        return prevMessagesData.filter((message) => message._id !== _id);
      });

      // Close the delete confirmation modal
      toggleDeleteConfirmation();
      getToast("Message Deleted Successfully");
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  return (
    <div className={checkIsLoggedInUserOrNot()}>
      <div
        className={`${
          loggedInuserDetails._id === user
            ? "loggedin-whole-message-container"
            : "whole-message-container"
        }`}
      >
        <div className="avatar-container">
          <div className="dp-icon-container">
            <div className="profile-letter-container">
              <p className="profile-letter"> {initialLetter}</p>
            </div>
          </div>
        </div>
        <div
          className={`${
            loggedInuserDetails._id === user
              ? "loggedin-each-message-container"
              : "each-message-container"
          }`}
        >
          <div className="username-time-container">
            <p className="username"> {userName} </p>
            <p className="time"> {formattedTime(data)} </p>
          </div>
          <div className="msg-text-container">
            <p className="msg-text"> {text} </p>
          </div>
          <div className="date-container">
            <p className="date"> {convertedDate()} </p>
            <IoCheckmarkDone className="sent-icon" />
          </div>
        </div>
        <div className="three-dots-container">
          {loggedInuserDetails._id === user && (
            <div ref={popoverRef}>
              <OverlayTrigger
                trigger="click"
                placement="left"
                show={popoverOpen}
                onToggle={setPopoverOpen}
                overlay={
                  <Popover id="popover-positioned-left">
                    <Popover.Body>
                      <div className="message-options-container">
                        <button
                          className="btn btn-light option-button"
                          onClick={toggleEditModal}
                        >
                          Edit Message
                        </button>
                        <button
                          className="btn btn-light option-button"
                          onClick={toggleDeleteConfirmation}
                        >
                          Delete Message
                        </button>
                      </div>
                    </Popover.Body>
                  </Popover>
                }
              >
                <span
                  className="options-icon"
                  onClick={() => setPopoverOpen(!popoverOpen)}
                >
                  <SlOptionsVertical style={{ cursor: "pointer" }} />
                </span>
              </OverlayTrigger>
            </div>
          )}
        </div>
      </div>

      {/* Edit Message Modal */}
      <Modal
        show={editModalShow}
        onHide={toggleEditModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <textarea
            className="form-control"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleEditModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleEditMessage}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={deleteConfirmationShow}
        onHide={toggleDeleteConfirmation}
        size="sm"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure want to delete the message?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleDeleteConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteMessage}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default Message;
