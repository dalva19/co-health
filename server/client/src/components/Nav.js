import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavContainer>
      <NavLink to="/">
        <h2 id="logo">Co-Health</h2>
      </NavLink>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  position: fixed;
  z-index: 999;
  background: black;
  color: whitesmoke;
  margin-bottom: 5rem;
  width: 100%;
  min-height: 5vh;
  padding: 1.5rem;
  #logo {
    position: relative;
    float: left;
    width: 150px;
    height: auto;
    cursor: pointer;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
`;
