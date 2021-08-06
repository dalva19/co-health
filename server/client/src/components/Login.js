import { useState, useEffect } from "react";
import styled from "styled-components";

const Login = () => {
  return (
    <>
      <LoginContainer>
        <form>
          <label>Username</label>
          <input />
          <label>Password</label>
          <input />
          <button>Submit</button>
        </form>
      </LoginContainer>
    </>
  );
};

const LoginContainer = styled.div`
  padding-top: 10vh;
`;

export default Login;
