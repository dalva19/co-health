import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../../actions/coordinatesAction";
import { registerUser } from "../../actions/registerActions";
//style
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { StyledButton } from "../../styles/styles";

const UserRegistration = () => {
  const dispatch = useDispatch();

  const { registered } = useSelector((state) => state.registration);
  const coordinates = useSelector((state) => state.coordinates.coordinates);

  //state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileType, setProfileType] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  //helper functions
  const splitStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  const handleSelectProfileInput = (e) => {
    setProfileType(e.target.value);
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
        username: username,
        password: password,
        email: email,
        profileType: profileType,
        street: street,
        city: city,
        state: state,
        zipcode: zip,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      dispatch(registerUser(body));
    }
  }, [
    coordinates,
    dispatch,
    street,
    city,
    state,
    zip,
    profileType,
    username,
    email,
    password,
  ]);

  // const handleSubmitButton = (e) => {
  //   e.preventDefault();

  //   const body = {
  //     username: username,
  //     password: password,
  //     email: email,
  //     profileType: profileType,
  //   };

  //   dispatch(registerUser(body));
  // };

  return (
    <>
      <RegisterContainer>
        <Container className="register-container">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2>Create Profile</h2>
              <hr></hr>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Profile Type </Form.Label>
                  <Form.Select
                    required
                    className="mb-3"
                    type="input"
                    onChange={handleSelectProfileInput}
                  >
                    <option value="">Choose...</option>
                    <option value="healthcare member">Healthcare Member</option>
                    <option value="community member">Community Member</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
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
            </Col>
          </Row>
        </Container>
      </RegisterContainer>

      <Route exact path="/co-health/register">
        {registered ? <Redirect to="/co-health/login" /> : ""}
      </Route>
    </>
  );
};

const RegisterContainer = styled.div`
  padding-top: 5vh;
`;

export default UserRegistration;
