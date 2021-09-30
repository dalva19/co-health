import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../../actions/coordinatesAction";
import { registerUser } from "../../actions/registerActions";
import { validFields } from "../../utilities/utilities";
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
  const [errors, setErrors] = useState({});

  //helper functions

  const transformStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  const handleSelectProfileInput = (e) => {
    setProfileType(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (
      validFields(
        {
          profileType,
          username,
          password,
          email,
          street,
          city,
          state,
          zip,
        },
        setErrors
      )
    ) {
      transformStreetName();
    }
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

  return (
    <>
      <RegisterContainer>
        <Container className="register-container">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2>Create Profile</h2>
              <hr></hr>
              <Form onSubmit={handleFormSubmit}>
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
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {errors.username ? <p>{errors.username?.message}</p> : ""}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {errors.password ? <p>{errors.password.message}</p> : ""}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {errors.email ? <p>{errors.email?.message}</p> : ""}
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
                    required
                    onChange={(e) => setStreet(e.target.value)}
                  />
                  {errors.street ? <p>{errors.street?.message}</p> : ""}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCityAddress">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="City"
                    value={city}
                    required
                    onChange={(e) => setCity(e.target.value)}
                  />
                  {errors.city ? <p>{errors.city?.message}</p> : ""}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicStateAddress">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="State"
                    value={state}
                    required
                    onChange={(e) => setState(e.target.value)}
                  />
                  {errors.state ? <p>{errors.state?.message}</p> : ""}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicZipAddress">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Zip Code"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                  {errors.zip ? <p>{errors.zip?.message}</p> : ""}
                </Form.Group>

                <StyledButton>
                  <Button className="button" type="submit">
                    Submit
                  </Button>
                </StyledButton>
              </Form>
            </Col>
          </Row>
        </Container>
      </RegisterContainer>

      <Route exact path="/register">
        {registered ? <Redirect to="/login" /> : ""}
      </Route>
    </>
  );
};

const RegisterContainer = styled.div`
  padding-top: 5vh;
  p {
    color: red;
    font-size: 15px;
    font-style: italic;
  }
`;

export default UserRegistration;
