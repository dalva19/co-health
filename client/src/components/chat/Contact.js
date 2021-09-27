import React from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Contact = ({
  contact,
  setSelectContact,
  chatOpen,
  setChatOpen,
  leaveChatRoom,
  resetChat,
}) => {
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.selectedContact);
  const selectedContact = useSelector(
    (state) => state.selectedContact.contact[0]
  );

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
    <div className="contact-container">
      <StyledContact>
        <div className="avatar-container">
          {!isLoading && contact.username === selectedContact.username ? (
            <img className="user-pic" src={selectedContact.avatar} alt="Pic" />
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="icon fa-3x " />
          )}
        </div>
        <p className="contact" onClick={handleContactClick}>
          {contact.username}
        </p>
      </StyledContact>
    </div>
  );
};

const StyledContact = styled.div`
  display: flex;
  p {
    cursor: pointer;
  }
  img {
    cursor: pointer;
  }
  .avatar-container {
    height: 7vh;
    width: 7vh;
  }
  .user-pic {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default Contact;
