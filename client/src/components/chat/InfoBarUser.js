import React from "react";
//style
import styled from "styled-components";

const InfoBarUser = ({ selectedContact }) => {
  return (
    <StyledAvatar>
      <div className="leftInnerContainer">
        {selectedContact.avatar ? (
          <div className="avatar-container">
            <img className="user-pic" src={selectedContact.avatar} alt="Pic" />
          </div>
        ) : (
          <h3>{selectedContact.username}</h3>
        )}
      </div>
    </StyledAvatar>
  );
};

const StyledAvatar = styled.div`
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
  h3 {
    color: white;
  }
`;

export default InfoBarUser;
