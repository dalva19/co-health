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
            <NavLink to="/co-health/login">
              <h4>login</h4>
            </NavLink>
          </li>
          <li>
            <NavLink to="/co-health/register">
              <h4>sign up</h4>
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

export default Nav;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 999;
  background: #f5b282;
  color: #fbe4b2;
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
  .links {
    display: flex;
    li {
      list-style: none;
      padding-right: 0.5rem;
    }
  }
`;
