import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../../actions/coordinatesAction";
import { updateProfileSettings } from "../../actions/memberActions";
//style
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const SettingsForm = (props) => {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.coordinates.coordinates);
  const member = useSelector((state) => state.member.member[0]);

  //state
  const [firstName, setFirstName] = useState(
    member.name ? member.name.firstName : ""
  );
  const [lastName, setLastName] = useState(
    member.name ? member.name.lastName : ""
  );
  const [avatar, setAvatar] = useState(member.avatar ? member.avatar : "");
  const [street, setStreet] = useState(
    member.address.street ? member.address.street : ""
  );
  const [city, setCity] = useState(
    member.address.city ? member.address.city : ""
  );
  const [state, setState] = useState(
    member.address.state ? member.address.state : ""
  );
  const [zip, setZip] = useState(
    member.address.zipcode ? member.address.zipcode : ""
  );
  const [address, setAddress] = useState("");

  //helper functions
  const splitStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    splitStreetName();
  };

  useEffect(() => {
    if (address) {
      dispatch(loadCoordinatesFromAddress(address));
    }
  }, [address, dispatch]);

  useEffect(() => {
    if (coordinates) {
      const body = {
        firstName: firstName,
        lastName: lastName,
        avatar: avatar[0] ? avatar[0].data_url : "",
        street: street,
        city: city,
        state: state,
        zipCode: parseInt(zip),
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      console.log(body);
      dispatch(updateProfileSettings(body));
    }
  }, [
    coordinates,
    dispatch,
    firstName,
    lastName,
    avatar,
    street,
    city,
    state,
    zip,
  ]);

  return (
    <>
      <Modal onHide={props.handleClose} show={props.show}>
        <StyledHeader>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Manage Personal Information</Modal.Title>
          </Modal.Header>
        </StyledHeader>
        <Modal.Body>
          <Form>
            <Form.Label>Profile Pic</Form.Label>
            <Avatar setAvatar={setAvatar} avatar={avatar} />
            <br />

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Text className="text-muted">
              Please enter your address to set your default community.
            </Form.Text>

            <Form.Group className="mb-3" controlId="formBasicStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCityAddress">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStateAddress">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicZipAddress">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>
            <StyledButton>
              <Button
                className="button"
                type="submit"
                onClick={handleSubmitButton}
              >
                Submit
              </Button>
            </StyledButton>
          </Form>
        </Modal.Body>
        <StyledFooter>
          <Modal.Footer></Modal.Footer>
        </StyledFooter>
      </Modal>
    </>
  );
};

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

export default SettingsForm;