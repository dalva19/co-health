import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "../chat/Input";
import { getChat } from "../../actions/chatActions";

const ENDPOINT = "http://localhost:8000";

let socket;

const Chat = () => {
  // const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [connectId, setConnectId] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const { username, profileType, _id } = useSelector(
    (state) => state.member.member
  );
  const { chatLog } = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chats._id);
  const { loaded } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  useEffect(() => {
    setRoom("chat");

    if (loaded) {
      setMessages([...chatLog]);
      setConnectId(chatId);
    }
  }, [chatLog, loaded, chatId]);

  const handleJoin = () => {
    socket = io(ENDPOINT);
    //add logic to match users based on user's chat log
    //click on contact and bring up chat
    let body;
    // dispatch(getContact("6132b468fad052ba8ee058cc"));

    if (profileType === "community member") {
      body = {
        communityMember: _id,
        healthcareMember: "6132b468fad052ba8ee058cc",
      };
    } else if (profileType === "healthcare member") {
      body = {
        communityMember: "613630c2b851e10378af64a0",
        healthcareMember: _id,
      };
    }

    dispatch(getChat(body));
  };

  useEffect(() => {
    if (chatId) {
      socket.emit("join", { username, room, chatId }, (error) => {
        if (error) {
          console.log(error);
        }
      });

      socket.on("message", (message) => {
        setMessages([...messages, message]);
      });
    }
  }, [messages]);

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
        <InfoBar room={room} />
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
