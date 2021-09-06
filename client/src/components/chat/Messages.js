import React from "react";

// import ScrollToBottom from 'react-scroll-to-bottom';

import Message from "./Message";

// import "./Messages.css";

const Messages = ({ messages, username }) => (
  <div className="messages">
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} username={username} />
      </div>
    ))}
  </div>
);

export default Messages;
