import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";

const NavigationTabs = (props) => {
  return (
    <>
      <StyledNavTabs>
        <Nav className="tabs" defaultActiveKey={props.defaultActiveKey}>
          <LinkContainer
            className="tab-link"
            activeClassName="tab-link-active"
            exact
            to="/profile"
          >
            <Nav.Item>
              <Nav.Link href="/profile">Home</Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer
            className="tab-link"
            activeClassName="tab-link-active"
            exact
            to="/profile/settings"
          >
            <Nav.Item>
              <Nav.Link href="/profile/settings">Settings</Nav.Link>
            </Nav.Item>
          </LinkContainer>

          <LinkContainer
            className="tab-link"
            activeClassName="tab-link-active"
            exact
            to="/profile/messages"
          >
            <Nav.Item>
              <Nav.Link href="/profile/messages">Messages</Nav.Link>
            </Nav.Item>
          </LinkContainer>
        </Nav>
      </StyledNavTabs>
    </>
  );
};

const StyledNavTabs = styled.div`
  padding-left: 1rem;
  padding-bottom: 2rem;
  padding-top: 0;
  margin-top: 1rem;

  .tab-link a {
    color: gray;
    font-size: large;
  }

  .tab-link:hover a {
    color: black;
  }

  .tab-link-active a {
    text-decoration: underline;
    text-underline-offset: 15px;
    color: black;
  }
`;
export default NavigationTabs;
