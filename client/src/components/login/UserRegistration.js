import { useState, useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../../actions/coordinatesAction";
import { registerUser } from "../../actions/registerActions";

const UserRegistration = () => {
  const dispatch = useDispatch();

  const { registered } = useSelector((state) => state.registration);

  const { coordinates, coordinatesLoaded } = useSelector(
    (state) => state.coordinates
  );

  //state
  const [firstName, setFirstName] = useState("danna");
  const [lastName, setLastName] = useState("alvarado");
  const [email, setEmail] = useState("ssssss@email.com");
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
  const [street, setStreet] = useState("114 chestnut ct ");
  const [city, setCity] = useState("jacksonville");
  const [state, setState] = useState("nc");
  const [zip, setZip] = useState("28546");
  const [address, setAddress] = useState("");
  const [profileType, setProfileType] = useState("");

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
        username: username,
        password: password,
        email: email,
        street: street,
        city: city,
        state: state,
        lat: coordinates.lat,
        lng: coordinates.lng,
        profileType: profileType,
      };

      dispatch(registerUser(body));
    }
  }, [address, dispatch, coordinatesLoaded]); //add dependencies to useeffect

  const handleSelectInput = (e) => {
    setProfileType(e.target.value);
  };

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
                    onChange={handleSelectInput}
                  >
                    <option value="">Choose...</option>
                    <option value="Healthcare Member">Healthcare Member</option>
                    <option value="Community Member">Community Member</option>
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

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Avatar</Form.Label>
                  <Form.Control type="file" />
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
