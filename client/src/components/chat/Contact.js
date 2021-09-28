import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { resetChat } from "../../actions/chatActions";

const Contact = ({
  contact,
  setSelectContact,
  chatOpen,
  setChatOpen,
  leaveChatRoom,
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
    <div className="contact-container">
      <StyledContact>
        <div className="avatar-container">
          {contact.avatar ? (
            <img className="user-pic" src={contact.avatar} alt="Pic" />
          ) : (
            <FontAwesomeIcon
              icon={faUserCircle}
              className="icon fa-3x default-pic "
            />
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
    font-family: "Inter", sans-serif;
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
  .default-pic {
    color: #ab417f;
  }
`;

export default Contact;
