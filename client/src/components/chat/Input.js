import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChatById } from "../../actions/chatActions";
//style
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Input = ({ setMessage, sendMessage, message }) => {
  const chatId = useSelector((state) => state.chat.chats._id);
  const dispatch = useDispatch();

  const handleSendButton = (e) => {
    sendMessage(e);
    // dispatch(getChatById(chatId));
  };

  return (
    <StyledInput>
      <form className="form">
        <input
          className="input"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={({ target: { value } }) => setMessage(value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
        {/* <button className="sendButton" onClick={handleSendButton}>
          Send
        </button> */}
        <FontAwesomeIcon
          icon={faPaperPlane}
          className="icon fa-2x send"
          onClick={handleSendButton}
        />
      </form>
    </StyledInput>
  );
};

const StyledInput = styled.div`
  .form {
    display: flex;
    border-top: 2px solid #d3d3d3;
  }

  .input {
    border: none;
    border-radius: 0;
    padding: 0.5rem;
    width: 90%;
    font-size: 1rem;
  }

  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }

  .send {
    color: #ab417f;
    cursor: pointer;
    padding-top: 0.2rem;
    padding-right: 0.2rem;
  }

  .sendButton {
    color: #fff !important;
    text-transform: uppercase;
    text-decoration: none;
    background: #ab417f;
    padding: 5px;
    display: inline-block;
    border: none;
    width: 10%;
  }
`;

export default Input;
