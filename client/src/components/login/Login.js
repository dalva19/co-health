import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../actions/memberActions";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { StyledButton } from "../../styles/styles";
import { validFields } from "../../utilities/utilities";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");

  const { loaded } = useSelector((state) => state.member);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validFields({ username, password }, setErrors)) {
      const body = {
        username: username,
        password: password,
      };

      dispatch(login(body));
      setUsername("");
      setPassword("");
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <LoginContainer>
        <Container className="register-container">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h2>Login</h2>
              <hr></hr>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                  />
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
      </LoginContainer>

      <Route exact path="/login">
        {loaded ? <Redirect to="/profile" /> : ""}
      </Route>
    </>
  );
};

const LoginContainer = styled.div`
  padding-top: 10vh;
`;

export default Login;
