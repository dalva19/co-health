import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = () => {
  const { pathname } = useLocation();
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
            <Line
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: pathname === "/co-health/register" ? "40%" : "0%",
              }}
            />
          </li>
          <li>
            <NavLink to="/co-health/login">
              <h4>login</h4>
            </NavLink>
            <Line
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: pathname === "/co-health/login" ? "40%" : "0%",
              }}
            />
          </li>
          <li className="logout">
            <NavLink to="/co-health/login">
              <h4>logout</h4>
            </NavLink>
            <Line
              transition={{ duration: 0.5 }}
              initial={{ width: "0%" }}
              animate={{
                width: pathname === "/co-health/logout" ? "40%" : "0%",
              }}
            />
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
    li {
      list-style: none;
      position: relative;
      padding-left: 5rem;
      padding-top: 0.5rem;
    }
  }
`;

const Line = styled(motion.div)`
  height: 0.3rem;
  background: #f18457;
  width: 0%;
  position: absolute;
  bottom: -80%;
  left: 60%;
`;

export default Nav;
