import Request from "./Request";
//styling
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

//map requests to make ind request
const Requests = ({ requests }) => {
  return (
    <CardsContainer>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <StyledCards>
            {requests.map((request, i) => (
              <div key={i}>
                <Request request={request} />
              </div>
            ))}
          </StyledCards>
        </Col>
      </Row>
    </CardsContainer>
  );
};

const CardsContainer = styled.div`
  margin-right: 15rem;
`;
const StyledCards = styled.div`
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: row;
`;

export default Requests;
