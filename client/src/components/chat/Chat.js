import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "../chat/Input";
// import { getChat } from "../../actions/chatActions";

const ENDPOINT = "http://localhost:8000";

let socket;

const Chat = () => {
  // const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [connectId, setConnectId] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [contact, setContact] = useState(false);

  const { username } = useSelector((state) => state.member.member);
  const { chatRoom } = useSelector((state) => state.chat);
  const { chatLog, _id } = useSelector((state) => state.chat.chats);

  // const dispatch = useDispatch();

  useEffect(() => {
    if (chatRoom === "chat") {
      socket = io(ENDPOINT);
    }
  }, [chatRoom]);

  const handleJoin = () => {
    // socket = io(ENDPOINT);
    //add logic to match users based on user's chat log
    //search all chats for a user and match based on the contact that they clicked

    if (chatLog) {
      setMessages([...chatLog]);
    }
    setConnectId(_id);
    setRoom(chatRoom);
    setContact(true);
  };

  useEffect(() => {
    if (contact) {
      socket.emit("join", { username, room, connectId }, (error) => {
        if (error) {
          console.log(error);
        }
      });

      socket.on("message", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [connectId, messages, username, room, contact]);

  const sendMessage = (event) => {
    event.preventDefault();

    const log = {
      message: message,
      username: username,
    };

    if (message) {
      socket.emit("sendMessage", log, () => setMessage(""));
    }
  };

  //add contacts component that lists all contacts based on 2 users being matched
  return (
    <div className="outerContainer">
      <button onClick={handleJoin}>Join</button>
      <div className="container">
        <h1>this is where chats go</h1>
        <InfoBar room={chatRoom} />
        <Messages messages={messages} username={username} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
