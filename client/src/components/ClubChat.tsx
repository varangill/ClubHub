import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { postData, getData } from "../api";
import Button from "react-bootstrap/Button";

const socket = io(`${import.meta.env.VITE_BACKEND_URL}`);

export default function ClubChat(props) {
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [mostRecentMessage, setMostRecentMessage] = useState({});
  const messagesBottomRef = useRef(null); //keeps track of bottom of chatbox

  useEffect(() => {
    getData(`messages/club/${props.clubId}`).then((res) => {
      setMessages(res);
      scrollToBottom();
    });

    socket.emit("loadClub", props.clubId);
    const newMessageHandler = (newMsg) => {
      setMessages((currentMessages) => [...currentMessages, newMsg]);
      setMostRecentMessage(newMsg);
      if (newMsg.userId == props.userId) {
        //if user sent msg, scroll to bottom
        scrollToBottom();
      }
    };

    socket.on("newMessage", newMessageHandler);

    return () => {
      socket.off("newMessage", newMessageHandler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    //This function is used to scroll to the bottom after the user sends a message
    //Due to how React handles state updates, need to keep track of the most recent msg
    if (mostRecentMessage["userId"] == props.userId) {
      scrollToBottom();
    }
  }, [mostRecentMessage, props.userId]);

  const scrollToBottom = () => {
    messagesBottomRef.current?.scrollIntoView();
  };

  const sendMessage = () => {
    postData(`messages/send`, {
      userId: props.userId,
      clubId: props.clubId,
      text: messageInput,
      username: props.userName,
    });
    setMessageInput("");
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
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="chat-text-input"
          placeholder="Enter message..."
          onKeyDown={(e) => {
            // Send the message when the user presses ENTER key
            if (e.key === "Enter") {
              e.preventDefault();
              sendMessage();
            }
          }}
        />
        <Button onClick={sendMessage} className="chat-send-button">
          Send
        </Button>
      </div>
    </div>
  );
}
