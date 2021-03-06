import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileLicense,
  getMemberProfile,
} from "../../actions/memberActions";
import { getLicense, verifyLicense } from "../../actions/licenseActions";
import { validFields } from "../../utilities/utilities";
//style
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const HealthcareLicenseForm = (props) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.member.member[0]);
  const { isLoading } = useSelector((state) => state.license);
  const license = useSelector((state) => state.license.license[0]);
  const [firstName, setFirstName] = useState(name ? name.firstName : "");
  const [lastName, setLastName] = useState(name ? name.lastName : "");
  const [licenseType, setLicenseType] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState({});

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      validFields(
        { firstName, lastName, licenseType, licenseNumber },
        setErrors
      )
    ) {
      const body = {
        name: `${firstName}${lastName}`,
        licenseType: licenseType,
        licenseNumber: licenseNumber,
      };
      dispatch(getLicense(body));
      dispatch(updateProfileLicense(body));
    } else {
      console.log(errors);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      dispatch(verifyLicense(license));
      dispatch(getMemberProfile());
    }
  }, [dispatch, isLoading, license]);

  return (
    <>
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
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                value={firstName}
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                required
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
                <option value="Physician Assistant">Physician Assistant</option>
                <option value="EMT">EMT</option>
                <option value="Paramedic">Paramedic</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLicenseNumber">
              <Form.Label>License Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="License Number"
                value={licenseNumber}
                required
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLicenseState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>
            <StyledButton>
              <Button className="button" variant="primary" type="submit">
                Submit
              </Button>
            </StyledButton>
          </Form>
        </Modal.Body>
        <StyledFooter>
          <Modal.Footer className="modal-footer"></Modal.Footer>
        </StyledFooter>
      </Modal>
    </>
  );
};

export default HealthcareLicenseForm;
