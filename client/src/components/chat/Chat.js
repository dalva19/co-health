import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import Contacts from "./Contacts";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "../chat/Input";
import { getChat } from "../../actions/chatActions";
import { setSocket } from "../../actions/socketActions";

const ENDPOINT = "http://localhost:8000"; //rewrite for process.env varible?

const Chat = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectContact, setSelectContact] = useState("");

  const { username, profileType, _id, contacts } = useSelector(
    (state) => state.member.member
  );
  const { chatLog } = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chats._id);
  const socketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);
    setRoom("chat");

    if (chatLog) {
      setMessages([...chatLog]);
    }
  }, [dispatch, chatLog, chatId]);

  useEffect(() => {
    if (selectContact) {
      dispatch(setSocket(socketRef.current));
      let body;

      if (profileType === "community member") {
        body = {
          communityMember: _id,
          healthcareMember: selectContact,
        };
      } else if (profileType === "healthcare member") {
        body = {
          communityMember: selectContact,
          healthcareMember: _id,
        };
      }

      dispatch(getChat(body));
    }
  }, [selectContact, _id, dispatch, profileType]);

  useEffect(() => {
    if (chatId) {
      socketRef.current.emit("join", { username, room, chatId }, (error) => {
        if (error) {
          console.log(error);
        }
      });

      socketRef.current.on("message", (message) => {
        setMessages([...messages, message]);
      });
    }

    socketRef.current.on("disconnect", () => {
      setMessages([]);
    });
  }, [messages, chatId, dispatch, room, username]);

  const sendMessage = (event) => {
    event.preventDefault();

    const log = {
      message: message,
      username: username,
    };

    if (message) {
      socketRef.current.emit("sendMessage", log, () => setMessage(""));
    }
  };

  return (
    <div className="chats-container">
      {contacts ? (
        <>
          <h2>Contacts</h2>
          <Contacts
            contacts={contacts}
            selectContact={setSelectContact}
            setSelectContact={setSelectContact}
          />
        </>
      ) : (
        <h2>Contacts</h2>
      )}

      <div className="chats-container">
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
