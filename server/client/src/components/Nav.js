import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavContainer>
      <NavLink to="/" id="logo">
        Co-Health
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
  margin: 0;
  width: 100%;
  min-height: 5vh;
  padding: 1.5rem;
  #logo {
    position: relative;
    float: left;
    width: 150px;
    height: auto;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
`;
