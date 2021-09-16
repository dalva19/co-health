import { useState, useEffect } from "react";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileLicense } from "../../actions/memberActions";
import { getLicense, verifyLicense } from "../../actions/licenseActions";

const HealthcareLicenseForm = (props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.member.member[0]);
  const { loaded } = useSelector((state) => state.license);
  const license = useSelector((state) => state.license.license[0]);

  //state
  const [firstName, setFirstName] = useState(name.firstName);
  const [lastName, setLastName] = useState(name.lastName);
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleSubmitButton = (e) => {
    e.preventDefault();

    const body = {
      name: `${firstName}${lastName}`,
      licenseType: licenseType,
      licenseNumber: licenseNumber,
    };

    dispatch(getLicense(body));
    dispatch(updateProfileLicense(body));
  };

  useEffect(() => {
    if (loaded) {
      dispatch(verifyLicense(license));
    }
  }, [dispatch, loaded]);

  return (
    <>
      <SettingsFormContainer>
        <Modal onHide={props.handleClose} animation={false} show={props.show}>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Verify License</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>

              {/* <Form.Group className="mb-3" controlId="formBasicLicense">
                <Form.Label>License Type</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Street"
                  value={licenseType}
                  onChange={(e) => setLicenseType(e.target.value)}
                />
              </Form.Group> */}

              <Form.Group className="mb-3" controlId="ormBasicLicense">
                <Form.Label>License Type</Form.Label>
                <Form.Select
                  id="formStatusSelect"
                  required
                  onChange={(e) => {
                    setLicenseType(e.target.value);
                  }}
                >
                  <option value="">Choose...</option>
                  <option value="Medical Doctor">Medical Doctor</option>
                  <option value="Registered Nurse">Registered Nurse</option>
                  <option value="Nurse Practitioner">Nurse Practitioner</option>
                  <option value="Physician Assistant">
                    Physician Assistant
                  </option>
                  <option value="EMT">EMT</option>
                  <option value="Paramedic">Paramedic</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicLicenseNumber">
                <Form.Label>License Number</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmitButton}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </SettingsFormContainer>
    </>
  );
};

const SettingsFormContainer = styled.div`
  padding-top: 5vh;
`;

export default HealthcareLicenseForm;
