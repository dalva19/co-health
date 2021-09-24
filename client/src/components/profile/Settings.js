import { useState } from "react";
import { useSelector } from "react-redux";
//components
import SettingsForm from "../account-creation/SettingsForm";
import HealthcareLicenseForm from "../account-creation/HealthcareLiscenceForm";
//styling
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import styled from "styled-components";

const Settings = () => {
  const [modal, setModal] = useState("");

  const { credentials, name, address, profileType } = useSelector(
    (state) => state.member.member[0]
  );

  const handleShowSettingsModal = () => {
    setModal("settings-modal");
  };

  const handleShowLicenseModal = () => {
    setModal("license-modal");
  };

  const handleClose = () => {
    setModal("close");
  };

  return (
    <StyledSettings>
      <Container>
        <Row>
          <h2>Settings</h2>
          <Col md={6}>
            <>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2">Personal Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>{name ? name.firstName : ""}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{name ? name.lastName : ""}</td>
                  </tr>
                  <tr>
                    <td>Community</td>
                    <td>{address.city}</td>
                  </tr>
                </tbody>
              </Table>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Street</td>
                    <td>{address.street}</td>
                  </tr>
                  <tr>
                    <td>City</td>
                    <td>{address.city}</td>
                  </tr>
                  <tr>
                    <td>State</td>
                    <td>{address.state}</td>
                  </tr>
                  <tr>
                    <td>Zipcode</td>
                    <td>{address.zipcode}</td>
                  </tr>
                </tbody>
              </Table>
            </>
            <Button onClick={handleShowSettingsModal} className="button">
              Manage Info
            </Button>
          </Col>
          {credentials.license && profileType === "healthcare member" ? (
            <Col>
              <Table bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2">License Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Licence Type</td>
                    <td>{credentials.license}</td>
                  </tr>
                  <tr>
                    <td>Licence Number</td>
                    <td>{credentials.licenseNumber}</td>
                  </tr>
                  <tr>
                    <td>Verified</td>
                    <td>{credentials.verified ? <p>Yes</p> : <p>No</p>}</td>
                  </tr>
                </tbody>
              </Table>
              <Button onClick={handleShowLicenseModal} className="button">
                Manage License
              </Button>
            </Col>
          ) : (
            <Col>
              {!credentials.license && profileType === "healthcare member" ? (
                <Button onClick={handleShowLicenseModal} className="button">
                  Add License
                </Button>
              ) : (
                ""
              )}
            </Col>
          )}
        </Row>
      </Container>

      <SettingsForm
        show={modal === "settings-modal"}
        handleClose={handleClose}
      />

      <HealthcareLicenseForm
        show={modal === "license-modal"}
        handleClose={handleClose}
      />
    </StyledSettings>
  );
};

const StyledSettings = styled.div`
  table {
    background-color: #ffffff;
  }
  .button {
    background-color: #ab417f;
    border: none;
  }
`;

export default Settings;
