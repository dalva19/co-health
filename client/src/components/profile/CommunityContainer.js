import { useSelector } from "react-redux";
//components
import CommunityProfile from "./CommunityProfile";
import MakeRequest from "../requests/MakeRequest";
//style
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";

const CommunityContainer = () => {
  const { requests } = useSelector((state) => state.member.member[0]);

  return (
    <>
      <MemberProfileContainer>
        {requests.length > 0 ? (
          <CommunityProfile />
        ) : (
          <>
            <MakeRequest />

            <StyledIntructions>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  <h2>
                    Click on the <span>plus sign</span> to make a request!
                  </h2>
                </Col>
              </Row>
            </StyledIntructions>
          </>
        )}
      </MemberProfileContainer>
    </>
  );
};

const MemberProfileContainer = styled.div`
  /* padding-top: 1rem; */
`;

const StyledIntructions = styled.div`
  height: 50vh;
  padding: 5rem 10rem;
  h2 {
    font-weight: lighter;
  }
  span {
    color: #f18457;
    font-weight: bold;
    font-style: italic;
  }
`;

export default CommunityContainer;
