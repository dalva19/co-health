import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import socketIOClient from "socket.io-client";

const Contact = ({
  contact,
  selectContact,
  setSelectContact,
  chatOpen,
  setChatOpen,
  disconnectSocket,
  connectSocket,
}) => {
  const socketRef = useRef();
  const ENDPOINT = "http://localhost:8000";

  const handleContactClick = () => {
    setSelectContact(contact.user);

    if (!chatOpen) {
      setChatOpen(true);
      socketRef.current = socketIOClient(ENDPOINT);
    } else {
      setChatOpen(false);
      disconnectSocket();
    }
  };

  return (
    <div className="contactContainer">
      <StyledContact>
        <p className="contact" onClick={handleContactClick}>
          {contact.username}
        </p>
      </StyledContact>
    </div>
  );
};

const StyledContact = styled.div`
  p {
    cursor: pointer;
  }
`;

export default Contact;
