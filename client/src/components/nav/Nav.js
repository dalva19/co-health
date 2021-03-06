import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
//actions
import { logout } from "../../actions/memberActions";
//style
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Nav = ({ socketRef }) => {
  const dispatch = useDispatch();
  const { loaded } = useSelector((state) => state.member);
  const member = useSelector((state) => state.member.member);

  const handleLogout = () => {
    //passport logout that ends cookie session
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
            <div className="avatar-container">
              {member[0].avatar ? (
                <img className="user-pic" src={member[0].avatar} alt="Pic" />
              ) : (
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="icon fa-3x plus "
                />
              )}
            </div>

            <h4 className="username"> {member[0].username}</h4>

            <div>
              <ul className="logout">
                <li className="logout">
                  <a onClick={handleLogout} href="/">
                    <h4>logout</h4>
                  </a>
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
                  <NavLink to="/register">
                    <h4>sign up</h4>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/login">
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
    color: white;
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
    justify-content: space-between;
    color: white;
    h4 {
      font-size: 18px;
      padding-right: 1rem;
      padding-top: 1rem;
    }
    .username {
      padding-left: 0.5rem;
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
  .avatar-container {
    height: 7vh;
    width: 7vh;
  }
  .user-pic {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export default Nav;
