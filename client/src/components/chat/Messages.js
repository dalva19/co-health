import React from "react";
import Message from "./Message";

const Messages = ({ messages, username, chatOpen }) => {
  return (
    <>
      {chatOpen ? (
        <div className="messages">
          {messages.map((message, i) => (
            <div key={i}>
              <Message message={message} username={username} />
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Messages;
