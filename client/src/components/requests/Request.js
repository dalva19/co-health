//styling
import { Card, Accordion } from "react-bootstrap";
import styled from "styled-components";

//individual request items
const Request = ({ request }) => {
  return (
    <StyledCard>
      <Card border="secondary" style={{ width: "18rem", height: "18rem" }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Request</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {request.username}
          </Card.Subtitle>
          <Card.Text>{request.text}</Card.Text>
          {/* <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Offers</Accordion.Header>
              <Accordion.Body>Testing</Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
        </Card.Body>
        <Card.Footer>
          <StyledFooter>
            <p>Delete</p>
            <p>Edit</p>
            <p>Offers</p>
          </StyledFooter>
        </Card.Footer>
      </Card>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding-left: 1rem;
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

export default Request;
