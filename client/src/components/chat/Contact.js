import React from "react";
import styled from "styled-components";

const Contact = ({ contact, selectContact, setSelectContact }) => {
  const handleContactClick = () => {
    setSelectContact(contact.user);
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
