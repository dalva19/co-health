import React from "react";
//components
import Nav from "./Nav";
import styled from "styled-components";

const Home = () => {
  return (
    <>
      <Nav />
      <HomeContainer>
        <h1>Welcome to Co-Health</h1>
        <h3>Helping mind the gap in community healthcare.</h3>
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.div`
  padding-top: 10vh;
`;

export default Home;
