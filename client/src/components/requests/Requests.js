import Request from "./Request";
//styling
import { Container, Col, Row } from "react-bootstrap";
import styled from "styled-components";

//map requests to make ind request
const Requests = ({ requests }) => {
  return (
    <Col md={8}>
      <Row>
        <StyledCards>
          {requests.map((request, i) => (
            <div key={i}>
              <Request request={request} />
            </div>
          ))}
        </StyledCards>
      </Row>
    </Col>
  );
};

const StyledCards = styled.div`
  min-height: 50vh;
  display: flex;
  flex-direction: row;
`;

export default Requests;
