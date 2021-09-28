import React from "react";
//style
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Input = ({ setMessage, sendMessage, message }) => {
  const handleSendButton = (e) => {
    sendMessage(e);
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
    padding-top: 0.4rem;
    padding-right: 0.2rem;
  }
`;

export default Input;
