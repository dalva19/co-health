import { useState } from "react";
import { useSelector } from "react-redux";
//components
import NavigationTabs from "./NavigationTabs";
import SettingsForm from "./SettingsForm";
import HealthcareLicenseForm from "./HealthcareLiscenceForm";
//styling
import { Button, Row, Col, Container, Table } from "react-bootstrap";

const Settings = () => {
  const [modal, setModal] = useState("");

  const { credentials, name, address } = useSelector(
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
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/settings" />

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
                    <td>{name.firstName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{name.lastName}</td>
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
            <Button onClick={handleShowSettingsModal}>Manage Info</Button>
          </Col>
          {credentials.license ? (
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
              <Button>Manage License</Button>
            </Col>
          ) : (
            <Col>
              <Button onClick={handleShowLicenseModal}>Add License</Button>
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
    </>
  );
};

export default Settings;
