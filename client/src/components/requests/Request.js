//styling
import { Card } from "react-bootstrap";
import styled from "styled-components";

//individual request items
const Request = ({ request }) => {
  return (
    <StyledCard>
      <Card border="secondary" style={{ width: "18rem", height: "15rem" }}>
        <Card.Header>Header</Card.Header>
        <Card.Body>
          <Card.Title>Request</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {request.username}
          </Card.Subtitle>
          <Card.Text>{request.text}</Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link>
        <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
        <Card.Footer className="text-muted">Footer</Card.Footer>
      </Card>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  padding-left: 1rem;
`;

export default Request;
