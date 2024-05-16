import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "../navbar";
import { IoMdSend } from "react-icons/io";
import Message from "../message";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./index.css";
import baseUrl from "../url.js";

const Chat = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [messagesData, setMessagesData] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const getAllMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}/allmessages`, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        });
        setMessagesData(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getAllMessages();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messagesData]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${baseUrl}/allmessages`, {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      });
      setMessagesData(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;
    try {
      await axios.post(
        `${baseUrl}/addmessage`,
        { text: newMessage },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      setNewMessage("");
      fetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const onHandleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="whole-chat-container">
      <Header />
      <div className="group-chat-container" ref={chatContainerRef}>
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
          messagesData.map((eachMessage, index) => (
            <Message
              messageDetails={eachMessage}
              handleEditedMessage={handleSendMessage}
              setMessagesData={setMessagesData}
              key={index}
            />
          ))
        )}
      </div>

      <div className="msg-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={newMessage}
          onKeyDown={onHandleKeyDown}
          onChange={(e) => setNewMessage(e.target.value)}
          className="message-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default Chat;
