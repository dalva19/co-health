import Offer from "./Offer";
//styling
import { Container, Col, Row, Spinner } from "react-bootstrap";
import styled from "styled-components";

const Offers = ({ offers }) => {
  return (
    <Col md={8}>
      <Row>
        <StyledCards>
          {offers.map((offer, i) => (
            <div key={i}>
              <Offer offer={offer} />
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

export default Offers;
