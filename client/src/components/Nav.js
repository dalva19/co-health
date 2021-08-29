import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Redirect, Route } from "react-router-dom";
import { logout } from "../actions/memberActions";
// import { useState } from "react";
// import { Button, NavbarBrand, Offcanvas } from "react-bootstrap";
import styled from "styled-components";
// import OffCanvasNav from "../components/profile/OffCanvasNav";

const Nav = () => {
  const dispatch = useDispatch();
  const { loaded } = useSelector((state) => state.member);
  const { username, avatar } = useSelector((state) => state.member.member);

  const options = [
    {
      backdrop: false,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {loaded ? (
        <NavContainer>
          <div>
            <NavLink to="/">
              <h2 id="logo">Co-Health</h2>
            </NavLink>
          </div>

          <div className="logged-in-name">
            <div>
              {avatar ? <img src={avatar} alt="avatar" /> : <h4>Pic</h4>}
            </div>
            <h4>Hi, {username}</h4>
            <div>
              <ul className="logout">
                <li className="logout">
                  <h4 onClick={handleLogout}>logout</h4>
                </li>
              </ul>
            </div>
          </div>
        </NavContainer>
      ) : (
        <>
          <NavContainer>
            <div>
              <NavLink to="/">
                <h2 id="logo">Co-Health</h2>
              </NavLink>
            </div>
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
              </ul>
            </div>
          </NavContainer>
        </>
      )}
    </>
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
  padding: 1rem 2rem 1rem 2rem;
  #logo {
    width: 150px;
    height: auto;
    cursor: pointer;
    font-family: "Lobster", cursive;
    font-style: ligther;
    font-size: 1.8rem;
  }
  .bars-title {
    display: flex;
    justify-content: space-evenly;
  }
  .bars {
    padding-right: 1.5rem;
  }
  .icon {
    color: white;
    cursor: pointer;
  }
  .logged-in-name {
    display: flex;
    justify-content: space-evenly;
    color: white;
    h4 {
      font-size: 18px;
      padding-right: 1rem;
    }
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
      font-size: 18px;
      &:hover {
        color: #fad39e;
      }
    }
  }
  .logout {
    text-decoration: underline;
    text-underline-offset: 15px;
    cursor: pointer;
    li {
      list-style: none;
    }
    h4 {
      font-size: 18px;
      &:hover {
        color: #fad39e;
      }
    }
  }
`;

export default Nav;
