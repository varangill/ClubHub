import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3000"); // Connect to your server

export default function ClubChat(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.emit("joinClub", props.clubId);

    socket.on("message", (message) => {
      console.log("new msg", message);
      setMessages((msgs) => [...msgs, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [props.clubId]); // Re-run effect if clubId changes

  const sendMessage = () => {
    socket.emit("sendMessage", { clubId: props.clubId, messageData: message });
    setMessage("");
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {messages.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
}
