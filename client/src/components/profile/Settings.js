import { useState } from "react";
import { useSelector } from "react-redux";
//components
import NavigationTabs from "./NavigationTabs";
import SettingsForm from "./SettingsForm";
//styling
import { Button, Row, Col, Container, Table } from "react-bootstrap";

const Settings = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { credentials, name, address } = useSelector(
    (state) => state.member.member[0]
  );
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
            <Button onClick={handleShow}>Manage Info</Button>
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
              <Button>Add License</Button>
            </Col>
          )}
        </Row>
      </Container>

      <SettingsForm
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default Settings;
