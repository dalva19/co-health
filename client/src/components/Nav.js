import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = () => {
  return (
    <NavContainer>
      <NavLink to="/">
        <h2 id="logo">Co-Health</h2>
      </NavLink>
      <div>
        <ul className="links">
          <li>
            <NavLink to="/co-health/register">
              <h4>sign up</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/co-health/login">
              <h4>login</h4>
            </NavLink>
          </li>
          <li className="logout">
            <NavLink to="/co-health/login">
              <h4>logout</h4>
            </NavLink>
          </li>
        </ul>
      </div>
    </NavContainer>
  );
};

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: sticky;
  z-index: 999;
  top: 0;
  background: #ab417f;
  color: #fbe4b2;
  width: 100%;
  min-height: 10vh;
  padding: 1rem 10rem;
  #logo {
    width: 150px;
    height: auto;
    cursor: pointer;
    font-family: "Lobster", cursive;
    font-style: ligther;
    font-size: 1.8rem;
  }
  a {
    color: #fff;
    text-decoration: none;
  }
  .links {
    display: flex;
    text-decoration: underline;
    text-underline-offset: 15px;
    li {
      list-style: none;
      position: relative;
      padding-left: 5rem;
      padding-top: 0.5rem;
    }
    h4 {
      &:hover {
        color: #fad39e;
      }
    }
  }
`;

// const Line = styled(motion.div)`
//   height: 0.3rem;
//   background: #f18457;
//   width: 0%;
//   position: absolute;
//   bottom: -80%;
//   left: 60%;
// `;

export default Nav;
