import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import socketIOClient from "socket.io-client";
import Contacts from "./Contacts";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "../chat/Input";
import { getChat, resetChat } from "../../actions/chatActions";

const ENDPOINT = "http://localhost:8000"; //rewrite for process.env varible?

const Chat = () => {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectContact, setSelectContact] = useState("");
  const [chatOpen, setChatOpen] = useState(false);

  const { username, profileType, _id, contacts } = useSelector(
    (state) => state.member.member[0]
  );
  const { chatLog } = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chats._id);
  const socketRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setRoom("chat");
    socketRef.current = socketIOClient(ENDPOINT);
    if (chatLog) {
      setMessages([...chatLog]);
    }
  }, [chatLog]);

  useEffect(() => {
    if (selectContact) {
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
          return error;
        }
      });
    }
    socketRef.current.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, chatId, dispatch, room, username, chatOpen]);

  const connectSocket = () => {
    socketRef.current.emit("join", { username, room, chatId }, (error) => {
      if (error) {
        return error;
      }
    });
  };

  const sendMessage = (event) => {
    event.preventDefault();

    const log = {
      message: message,
      username: username,
    };

    if (message) {
      socketRef.current.emit("sendMessage", { log, chatId }, () =>
        setMessage("")
      );
    }
  };

  const leaveChatRoom = () => {
    socketRef.current.emit("leaveRoom", { chatId });
  };

  const disconnectSocket = () => {
    socketRef.current.disconnect();
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
            chatOpen={chatOpen}
            setChatOpen={setChatOpen}
            connectSocket={connectSocket}
            disconnectSocket={disconnectSocket}
            leaveChatRoom={leaveChatRoom}
            resetChat={resetChat}
          />
        </>
      ) : (
        <h2>Contacts</h2>
      )}

      <div className="chats-container">
        <h1>this is where chats go</h1>
        <InfoBar room={room} />
        <Messages messages={messages} username={username} chatOpen={chatOpen} />
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
