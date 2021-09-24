//styling
import { Card, CloseButton, Badge } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

//individual offer items
const HealthCard = ({ profile }) => {
  return (
    <StyledCard>
      <Card style={{ width: "40rem", height: "40rem" }}>
        <Card.Header>
          {profile[0].avatar ? (
            profile[0].avatar
          ) : (
            <FontAwesomeIcon icon={faUserCircle} className="icon fa-3x plus " />
          )}
        </Card.Header>

        <Card.Body>
          <Card.Title>{profile[0].username}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {profile[0].name.firstName}
            {""}
            {profile[0].name.lastName}
          </Card.Subtitle>
          <Card.Subtitle className="mb-2 text-muted">
            {profile[0].credentials.license}
          </Card.Subtitle>
          <Card.Text></Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer"></Card.Footer>
      </Card>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  margin-top: 2rem;
  padding-left: 25rem;
  .card {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  #accept {
    background-color: #89b173;
  }
  .card-header {
    background-color: #ab417f;
    color: white;
  }
  .card-footer {
    background-color: #ab417f;
    color: white;
    /* display: flex;
    align-items: center;
    justify-content: space-around; */
    cursor: pointer;
  }
`;

export default HealthCard;
