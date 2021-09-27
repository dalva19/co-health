import Offer from "./Offer";
//styling
import { Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Offers = ({ offers }) => {
  return (
    <CardsContainer>
      <Row>
        <Col md={{ span: 10, offset: 1 }}>
          <StyledCards>
            {offers.map((offer, i) => (
              <div key={i}>
                <Offer offer={offer} />
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
  margin-top: 5rem;
  min-height: 70vh;
  display: flex;
  flex-direction: row;
`;

export default Offers;
