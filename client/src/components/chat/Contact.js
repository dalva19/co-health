import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

const Contact = ({
  contact,
  setSelectContact,
  chatOpen,
  setChatOpen,
  leaveChatRoom,
  resetChat,
}) => {
  const dispatch = useDispatch();

  const handleContactClick = () => {
    if (!chatOpen) {
      setChatOpen(true);
      setSelectContact(contact.user);
    } else {
      setChatOpen(false);
      setSelectContact("");
      leaveChatRoom();
      dispatch(resetChat());
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
