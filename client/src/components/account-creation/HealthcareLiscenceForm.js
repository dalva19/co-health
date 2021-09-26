import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileLicense,
  getMemberProfile,
} from "../../actions/memberActions";
import { getLicense, verifyLicense } from "../../actions/licenseActions";
//style
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const HealthcareLicenseForm = (props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.member.member[0]);
  const { isLoading } = useSelector((state) => state.license);
  const license = useSelector((state) => state.license.license[0]);

  //state
  const [firstName, setFirstName] = useState(name ? name.firstName : "");
  const [lastName, setLastName] = useState(name ? name.lastName : "");
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
    if (!isLoading) {
      dispatch(verifyLicense(license));
      dispatch(getMemberProfile());
    }
  }, [dispatch, isLoading, license]);

  return (
    <>
      <LicenseFormContainer>
        <Modal className="modal" onHide={props.handleClose} show={props.show}>
          <StyledHeader>
            <Modal.Header
              className="modal-header"
              closeButton={props.handleClose}
            >
              <Modal.Title>Verify License</Modal.Title>
            </Modal.Header>
          </StyledHeader>
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
              <StyledButton>
                <Button
                  className="button"
                  variant="primary"
                  type="submit"
                  onClick={handleSubmitButton}
                >
                  Submit
                </Button>
              </StyledButton>
            </Form>
          </Modal.Body>
          <StyledFooter>
            <Modal.Footer className="modal-footer"></Modal.Footer>
          </StyledFooter>
        </Modal>
      </LicenseFormContainer>
    </>
  );
};

const LicenseFormContainer = styled.div`
  /* .modal {
    color: red;
    .modal-header {
      background-color: #ab417f;
    }
  }
  .button {
    color: red;
  } */
`;

// const StyledHeader = styled.div`
//   .modal-header {
//     background-color: #ee977c;
//     color: #3a2d49;
//   }
// `;

// const StyledFooter = styled.div`
//   .modal-footer {
//     background-color: #ee977c;
//     color: #3a2d49;
//   }
// `;

// const StyledButton = styled.div`
//   .button {
//     background-color: #ab417f;
//     border: none;
//   }
// `;

export default HealthcareLicenseForm;
