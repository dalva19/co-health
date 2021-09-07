import React from "react";

const Message = ({ message, username }) => {
  let isSentByCurrentUser = false;

  const trimmedName = message.username.trim().toLowerCase();

  if (username === trimmedName) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimmedName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{message.message}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{message.message}</p>
      </div>
      <p className="sentText pl-10 ">{message.username}</p>
    </div>
  );
};

export default Message;
