import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import HealthcareLicenseForm from "../components/account-creation/HealthcareLiscenceForm";
import VerificationStatusAlert from "../components/license-verification/VerificationStatusAlert";
//style
import { Button } from "react-bootstrap";
import styled from "styled-components";
import { Page, Image } from "../styles/styles";
import clickHere from "../img/undraw_Click_here_re_y6uq.svg";

const VerifyLicensePage = () => {
  const [modal, setModal] = useState("");
  const { username, credentials } = useSelector(
    (state) => state.member.member[0]
  );
  const { isLoading } = useSelector((state) => state.license);

  const handleShowLicenseModal = () => {
    setModal("license-modal");
  };

  const handleClose = () => {
    setModal("close");
  };

  const history = useHistory();

  const handleProfilePageButton = () => {
    history.push("/co-health/profile");
  };

  return (
    <>
      <Page>
        <StyledVerifyLicense>
          <div className={credentials.verified ? "hidden" : "show"}>
            <h2>
              Welcome <span>{username}</span>!
            </h2>
            <h3>
              In order to be a healthcare member, you must first{" "}
              <span>add</span> a professional license.
            </h3>
            <p>Please click the button below to get started.</p>

            <Button className="verify-button" onClick={handleShowLicenseModal}>
              Verify License
            </Button>
          </div>

          {!isLoading ? (
            <StyledAlert>
              <VerificationStatusAlert />
              <Button
                className="profile-button"
                id={credentials.verified ? "show" : ""}
                onClick={handleProfilePageButton}
              >
                Profile Page
              </Button>
            </StyledAlert>
          ) : (
            ""
          )}
        </StyledVerifyLicense>

        <Image>
          <img className="image" src={clickHere} alt="click-here" />
        </Image>
      </Page>

      <HealthcareLicenseForm
        show={modal === "license-modal"}
        handleClose={handleClose}
      />
    </>
  );
};

const StyledVerifyLicense = styled.div`
  /* margin-left: 15rem; */
  flex: 1;
  padding-right: 5rem;
  z-index: 2;
  .hidden {
    display: none;
  }
  .show {
    visibility: visible;
  }
  h3 {
    font-family: "Inter", sans-serif;
    color: #3a2d49;
    /* font-weight: lighter; */
  }
  span {
    color: #f18457;
    font-weight: bold;
  }
  p {
    color: #f5b282;
    font-size: 20px;
    font-style: italic;
  }
  .verify-button {
    background-color: #ab417f;
    border: solid #ab417f;
  }
  .image {
    height: 20vh;
  }
`;

const StyledAlert = styled.div`
  margin-top: 2rem;
  #show {
    visibility: visible;
  }
  .profile-button {
    background-color: #ab417f;
    border: solid #ab417f;
    visibility: hidden;
  }
`;

export default VerifyLicensePage;
