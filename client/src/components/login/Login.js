import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/memberActions";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loaded } = useSelector((state) => state.member);

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    const body = {
      username: username,
      password: password,
    };

    dispatch(login(body));
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <LoginContainer>
        <Container className="register-container">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2>Login</h2>
              <hr></hr>
              <Form>
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

                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleLoginSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </LoginContainer>

      <Route exact path="/co-health/login">
        {loaded ? <Redirect to="/co-health/profile" /> : ""}
      </Route>
    </>
  );
};

const LoginContainer = styled.div`
  padding-top: 10vh;
`;

export default Login;
