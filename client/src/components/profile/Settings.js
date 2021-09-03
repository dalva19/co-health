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

  const { credentials } = useSelector((state) => state.member);
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/settings" />

      <Container>
        <Row>
          <h2>Settings</h2>
          <Col>
            {credentials ? (
              <Table bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2">Personal Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>NAME</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>Last NAME</td>
                  </tr>
                  <tr>
                    <td>Community</td>
                    <td>Durham</td>
                  </tr>
                  <tr>
                    <td>Licence Type</td>
                    <td>RN</td>
                  </tr>
                  <tr>
                    <td>Verified</td>
                    <td>Yes</td>
                  </tr>
                </tbody>
              </Table>
            ) : (
              <Table bordered hover>
                <thead>
                  <tr>
                    <th colSpan="2">Personal Information</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>NAME</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>Last NAME</td>
                  </tr>
                  <tr>
                    <td>Community</td>
                    <td>Durham</td>
                  </tr>
                </tbody>
              </Table>
            )}
          </Col>
          <Col>
            <Table bordered hover>
              <thead>
                <tr>
                  <th colSpan="2">Address</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Street</td>
                  <td>114 Chestnut Ct</td>
                </tr>
                <tr>
                  <td>City</td>
                  <td>Durham</td>
                </tr>
                <tr>
                  <td>State</td>
                  <td>NC</td>
                </tr>
                <tr>
                  <td>Zipcode</td>
                  <td>27712</td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <Button onClick={handleShow}>Manage Settings</Button>
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
