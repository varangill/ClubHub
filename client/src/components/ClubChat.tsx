import { useState, useEffect } from "react";
import io from "socket.io-client";
import { postData, getData } from "../api";

const socket = io("http://localhost:3000");

export default function ClubChat(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    getData(`messages/club/${props.clubId}`).then((res) => {
      setMessages(res);
    });

    socket.emit("loadClub", props.clubId);
    const newMessageHandler = (newMsg) => {
      setMessages((currentMessages) => [...currentMessages, newMsg]);
    };

    socket.on("newMessage", newMessageHandler);

    return () => {
      socket.off("newMessage", newMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendMessage = () => {
    postData(`messages/send`, {
      userId: props.userId,
      clubId: props.clubId,
      text: message,
      username: props.userName,
    });
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
        <p key={index}>{msg["text"]}</p>
      ))}
    </div>
  );
}
