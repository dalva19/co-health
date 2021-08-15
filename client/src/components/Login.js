import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/memberActions";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";
import { Page } from "../styles/styles";

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
          <button onClick={handleLoginSubmit}>submit</button>
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
  label {
    margin-right: 0.5rem;
    font-weight: bold;
  }
  input {
    width: 25%;
    font-size: 1rem;
    padding: 0.5rem;
    margin-right: 0.5rem;
  }
`;

export default Login;
