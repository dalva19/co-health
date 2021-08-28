import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../../actions/coordinatesAction";
import { registerUser } from "../../actions/registerActions";

const SettingsForm = () => {
  const dispatch = useDispatch();

  const { registered } = useSelector((state) => state.registration);

  const { coordinates, coordinatesLoaded } = useSelector(
    (state) => state.coordinates
  );

  //state
  const [firstName, setFirstName] = useState("danna");
  const [lastName, setLastName] = useState("alvarado");
  const [avatar, setAvatar] = useState("");
  const [street, setStreet] = useState("114 chestnut ct ");
  const [city, setCity] = useState("jacksonville");
  const [state, setState] = useState("nc");
  const [zip, setZip] = useState("28546");
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

    if (coordinatesLoaded) {
      const body = {
        firstName: firstName,
        lastName: lastName,
        avatar: avatar,
        street: street,
        city: city,
        state: state,
        zipCode: zip,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };

      dispatch(registerUser(body));
    }
  }, [
    address,
    dispatch,
    coordinatesLoaded,
    firstName,
    lastName,
    avatar,
    street,
    city,
    state,
    zip,
    coordinates.lat,
    coordinates.lng,
  ]);

  return (
    <>
      <SettingsFormContainer>
        <Container className="register-container">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2>Manage Personal Information</h2>
              <hr></hr>
              <Form>
                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control
                    type="file"
                    value={avatar}
                    onChange={(e) => setAvatar(e.target.value)}
                  />
                </Form.Group>

                <hr></hr>

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
                  Please enter your address to set your community home.
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

                <Form.Group className="mb-3" controlId="formBasicStateAddress">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
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

                <Form.Group className="mb-3" controlId="formBasicZipAddress">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
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
            </Col>
          </Row>
        </Container>
      </SettingsFormContainer>
    </>
  );
};

const SettingsFormContainer = styled.div`
  padding-top: 5vh;
`;

export default SettingsForm;
