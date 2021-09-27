import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//components
import Contacts from "./Contacts";
import Messages from "./Messages";
import InfoBar from "./InfoBar";
import Input from "../chat/Input";
//actions
import { getChat, resetChat, joinRoom } from "../../actions/chatActions";
import { getContact } from "../../actions/contactActions";
//style
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

const Chat = ({ socketRef }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectContact, setSelectContact] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const { username, profileType, _id, contacts } = useSelector(
    (state) => state.member.member[0]
  );
  const { chatLog } = useSelector((state) => state.chat.chats);
  const chatId = useSelector((state) => state.chat.chats._id);

  const dispatch = useDispatch();

  //loades prev chats based on which contact is selected from list
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
      dispatch(getContact(selectContact));
    }
  }, [selectContact, _id, dispatch, profileType]);

  //loads prev chats into local state to be emitted
  useEffect(() => {
    if (chatLog) {
      setMessages([...chatLog]);
    }
  }, [chatLog]);

  //joins room when unique chatId for 2 contacts is present
  useEffect(() => {
    if (chatId) {
      joinRoom(socketRef, chatId);
    }
  }, [chatId, socketRef]);

  //emits new message on screen when message is changed
  useEffect(() => {
    socketRef.current.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages, chatId, dispatch, socketRef]);

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

  const leaveChatRoom = (chatId) => {
    socketRef.current.emit("leaveRoom", { chatId });
  };

  return (
    <Row>
      <Col md={{ span: 2, offset: 1 }}>
        <div className="contacts-container">
          {contacts ? (
            <>
              <h2>Contacts</h2>
              <Contacts
                socketRef={socketRef}
                contacts={contacts}
                selectContact={setSelectContact}
                setSelectContact={setSelectContact}
                chatOpen={chatOpen}
                setChatOpen={setChatOpen}
                leaveChatRoom={leaveChatRoom}
                resetChat={resetChat}
              />
            </>
          ) : (
            <h2>No Contacts</h2>
          )}
        </div>
      </Col>

      {chatOpen ? (
        <Col>
          <StyledChats>
            <div className="outer-container">
              <div className="chats-container">
                <InfoBar
                  leaveChatRoom={leaveChatRoom}
                  setChatOpen={setChatOpen}
                />
                <Messages
                  messages={messages}
                  username={username}
                  chatOpen={chatOpen}
                />
                <Input
                  message={message}
                  setMessage={setMessage}
                  sendMessage={sendMessage}
                />
              </div>
            </div>
          </StyledChats>
        </Col>
      ) : (
        ""
      )}
    </Row>
  );
};

const StyledChats = styled.div`
  .outer-container {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    height: 100vh;
    /* background-color: #1a1a1d; */
  }

  .chats-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #ffffff;
    border-radius: 8px;
    height: 80%;
    width: 50%;
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }

  @media (min-width: 320px) and (max-width: 480px) {
    .outer-ontainer {
      height: 100%;
    }

    .chats-container {
      width: 100%;
      height: 100%;
    }
  }

  @media (min-width: 480px) and (max-width: 1200px) {
    .container {
      width: 60%;
    }
  }
`;

export default Chat;
