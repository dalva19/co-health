import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/memberActions";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import Button from "./Button";
import styled from "styled-components";

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

  const handleUsernameText = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordText = (e) => {
    setPassword(e.target.value);
  };
  return (
    <>
      <LoginContainer>
        <form>
          <label>Username</label>
          <input type="text" onChange={handleUsernameText} value={username} />
          <label>Password</label>
          <input type="text" onChange={handlePasswordText} value={password} />
          <button onClick={handleLoginSubmit}>Submit</button>
        </form>
      </LoginContainer>
      <Route exact path="/co-health/login">
        {loaded ? <Redirect to="/co-health/profile" /> : ""}
      </Route>
    </>
  );
};

const LoginContainer = styled.div`
  padding-top: 30vh;
  text-align: center;
  input {
    width: 20%;
  }
  button {
    border: none;
    background-color: #0d2c32;
    padding: 0.5rem 1rem;
    color: #fce4b4;
    font-family: "Montserrat", sans-serif;
    font-weight: bold;
    margin-left: 0.5rem;
  }
`;

export default Login;
