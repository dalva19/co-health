import { useState } from "react";
import { Redirect, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/registerActions";
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { StyledButton } from "../../styles/styles";

const UserRegistration = () => {
  const dispatch = useDispatch();

  const { registered } = useSelector((state) => state.registration);

  //state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [profileType, setProfileType] = useState("");

  const handleSubmitButton = (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
      email: email,
      profileType: profileType,
    };

    dispatch(registerUser(body));
  };

  const handleSelectProfileInput = (e) => {
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
