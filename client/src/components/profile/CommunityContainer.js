import { useState } from "react";
import { useSelector } from "react-redux";
//components
import CommunityProfile from "./CommunityProfile";
import SettingsForm from "./SettingsForm";
//style
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";

const CommunityContainer = () => {
  const { address } = useSelector((state) => state.member.member[0]);
  const [modal, setModal] = useState("");

  const handleShowSettingsModal = () => {
    setModal("settings-modal");
  };

  const handleClose = () => {
    setModal("close");
  };

  //if requests load component with requests
  //else load plus image with span on how to make a request?
  return (
    <>
      <MemberProfileContainer>
        {address.city ? (
          <CommunityProfile />
        ) : (
          <>
            <h3>Please fill out a few details to get started!</h3>
            <Button onClick={handleShowSettingsModal}>
              Community Information
            </Button>
          </>
        )}
      </MemberProfileContainer>

      <SettingsForm
        show={modal === "settings-modal"}
        handleClose={handleClose}
      />
    </>
  );
};

const MemberProfileContainer = styled.div`
  /* padding-top: 1rem; */
`;

export default CommunityContainer;
