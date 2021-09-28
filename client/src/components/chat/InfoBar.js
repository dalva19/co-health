import React from "react";
import { useSelector, useDispatch } from "react-redux";
import InfoBarUser from "./InfoBarUser";
//style
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Placeholder } from "react-bootstrap";

const InfoBar = ({
  leaveChatRoom,
  setChatOpen,
  resetChat,
  setSelectContact,
}) => {
  const { isLoading } = useSelector((state) => state.selectedContact);
  const selectedContact = useSelector(
    (state) => state.selectedContact.contact[0]
  );

  const dispatch = useDispatch();

  const handleCloseChat = () => {
    leaveChatRoom();
    dispatch(resetChat());
    setSelectContact("");
    setChatOpen(false);
  };

  return (
    <StyledInfoBar>
      <div className="leftInnerContainer">
        {!isLoading ? (
          <InfoBarUser selectedContact={selectedContact} />
        ) : (
          <>
            <Placeholder xs={6} animation="glow" />
          </>
        )}
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
