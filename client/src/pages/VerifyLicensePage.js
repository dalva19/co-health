import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import HealthcareLicenseForm from "../components/account-creation/HealthcareLiscenceForm";
import VerificationStatusAlert from "../components/account-creation/VerificationStatusAlert";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

const VerifyLicensePage = () => {
  const [modal, setModal] = useState("");
  const { username } = useSelector((state) => state.member.member[0]);
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
      <Container>
        <Row>
          <div className="verify-instructions">
            <h2>
              Welcome {username}, in order to be a healthcare member, you must
              first add a professional license.
            </h2>
            <p>Please click the button below to get started.</p>

            <Button onClick={handleShowLicenseModal}>Verify License</Button>
          </div>
        </Row>

        {!isLoading ? (
          <>
            <VerificationStatusAlert />
            <Button onClick={handleProfilePageButton}>Profile Page</Button>
          </>
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </Container>

      <HealthcareLicenseForm
        show={modal === "license-modal"}
        handleClose={handleClose}
      />
    </>
  );
};

export default VerifyLicensePage;
