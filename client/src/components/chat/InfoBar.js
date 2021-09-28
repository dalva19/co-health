import React from "react";
import { useSelector } from "react-redux";
import InfoBarUser from "./InfoBarUser";
//style
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const InfoBar = ({ leaveChatRoom, setChatOpen }) => {
  const { isLoading } = useSelector((state) => state.selectedContact);
  const selectedContact = useSelector(
    (state) => state.selectedContact.contact[0]
  );

  const handleCloseChat = () => {
    leaveChatRoom();
    setChatOpen(false);
  };

  return (
    <StyledInfoBar>
      <div className="leftInnerContainer">
        {!isLoading ? <InfoBarUser selectedContact={selectedContact} /> : ""}
      </div>
      <div className="rightInnerContainer">
        <FontAwesomeIcon
          icon={faTimes}
          className="icon fa-2x close "
          onClick={handleCloseChat}
        />
      </div>
    </StyledInfoBar>
  );
};

const StyledInfoBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #ab417f;
  border-radius: 4px 4px 0 0;
  height: 60px;
  width: 100%;

  .leftInnerContainer {
    flex: 0.5;
    display: flex;
    align-items: center;
    margin-left: 5%;
    color: white;
  }

  .rightInnerContainer {
    display: flex;
    flex: 0.5;
    justify-content: flex-end;
    margin-right: 5%;
  }

  .online-icon {
    margin-right: 5%;
  }

  .close {
    color: white;
    cursor: pointer;
  }
`;

export default InfoBar;
