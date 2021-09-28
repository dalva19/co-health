import React from "react";
//style
import styled from "styled-components";
import { Placeholder } from "react-bootstrap";

const Message = ({ message, username }) => {
  let isSentByCurrentUser = false;

  const trimmedName = message.username.replace(/\s+/g, "").trim().toLowerCase();

  if (username === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <StyledMessage>
      <div className="message-container justifyEnd">
        <div className="message-box background-purple">
          <p className="message-text light">
            {message.message ? (
              message.message
            ) : (
              <>
                <Placeholder xs={3} animation="glow" />
              </>
            )}
          </p>
        </div>
      </div>
    </StyledMessage>
  ) : (
    <StyledMessage>
      <div className="message-container justifyStart">
        <div className="message-box background-light">
          <p className="message-text dark">
            {message.message ? (
              message.message
            ) : (
              <>
                <Placeholder xs={3} animation="glow" />
              </>
            )}
          </p>
        </div>
      </div>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  .message-box {
    background: #f3f3f3;
    border-radius: 0.5rem;
    padding-top: 0.2rem;
    padding-bottom: 0.2rem;
    padding-left: 1rem;
    padding-right: 1rem;
    color: white;
    display: inline-block;
    max-width: 80%;
  }

  .message-text {
    width: 100%;
    letter-spacing: 0;
    float: left;
    font-size: 1.1em;
    word-wrap: break-word;
    vertical-align: middle;
    margin-bottom: 0;
  }

  .message-text img {
    vertical-align: middle;
  }

  .message-container {
    display: flex;
    justify-content: flex-end;
    padding: 0 1rem;
    margin-top: 0.2rem;
  }

  .sent-text {
    display: flex;
    align-items: center;
    font-family: "Inter", sans-serif;
    color: #828282;
    /* letter-spacing: 0.3px; */
  }

  .pl {
    padding-left: 2rem;
  }

  .pr {
    padding-right: 2rem;
  }

  .justifyStart {
    justify-content: flex-start;
  }

  .justifyEnd {
    justify-content: flex-end;
  }

  .light {
    color: white;
  }

  .dark {
    color: #353535;
  }

  .background-purple {
    background: #ab417f;
  }

  .background-light {
    background: #f3f3f3;
  }
`;

export default Message;
