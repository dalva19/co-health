import React from "react";
import Message from "./Message";
import ScrollToBottom from "react-scroll-to-bottom";
//style
import styled from "styled-components";

const Messages = ({ messages, username, chatOpen }) => {
  return (
    <>
      {chatOpen ? (
        <StyledMessages>
          <ScrollToBottom>
            {messages.map((message, i) => (
              <div key={i}>
                <Message message={message} username={username} />
              </div>
            ))}
          </ScrollToBottom>
        </StyledMessages>
      ) : (
        ""
      )}
    </>
  );
};

const StyledMessages = styled.div`
  padding: 5% 0;
  overflow: auto;
  flex: auto;
`;

export default Messages;
