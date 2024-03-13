import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { postData, getData } from "../api";
import Button from "react-bootstrap/Button";

const socket = io("http://localhost:3000");

export default function ClubChat(props) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesBottomRef = useRef(null); //keeps track of bottom of chatbox

  useEffect(() => {
    getData(`messages/club/${props.clubId}`).then((res) => {
      setMessages(res);
      scrollToBottom();
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

  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView();
  };

  const sendMessage = () => {
    postData(`messages/send`, {
      userId: props.userId,
      clubId: props.clubId,
      text: message,
      username: props.userName,
    });
    setMessage("");
    scrollToBottom();
  };

  return (
    <div>
      <center>
        <h2>Club Messaging Board</h2>
      </center>
      <div className="chat-messages-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <p key={index}>
              {msg["username"]}: {msg["text"]}
            </p>
          ))}
          <div ref={messagesBottomRef} />{" "}
          {/* empty div to track bottom of chat */}
        </div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-text-input"
        />
        <Button onClick={sendMessage} className="chat-send-button">
          Send
        </Button>
      </div>
    </div>
  );
}
