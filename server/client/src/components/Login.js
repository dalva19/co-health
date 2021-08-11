import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../actions/memberProfileActions";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import styled from "styled-components";

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loaded } = useSelector((state) => state.registration);

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
  padding-top: 10vh;
`;

export default Login;
