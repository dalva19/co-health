import { useHistory } from "react-router";
import { useSelector } from "react-redux";
//styling
import { Card, Badge, Button, Accordion } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

//individual offer items
const HealthCard = ({ profile }) => {
  const history = useHistory();
  const { selectedRequest } = useSelector((state) => state.requests);

  const handleBackButton = () => {
    history.push("/co-health/profile");
  };

  const offer = profile[0].offers.find(
    (offer) => offer.request === selectedRequest._id
  );

  return (
    <StyledCard>
      <Card style={{ width: "35rem", height: "35rem" }}>
        <Card.Header className="card-header">
          <div className="avatar-container">
            {profile[0].avatar ? (
              <img className="user-pic" src={profile[0].avatar} alt="Pic" />
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faUserCircle}
                  className="icon fa-3x plus "
                />
                <h2>{profile[0].username}</h2>
              </>
            )}
          </div>
        </Card.Header>

        <Card.Body className="body">
          <Card.Title>
            {profile[0].name.firstName}
            {""}
            {profile[0].name.lastName}
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted subtitle">
            {profile[0].credentials.license}
            <Badge pill bg="success" className="verification-badge">
              verified
            </Badge>
          </Card.Subtitle>
          <Card.Text>
            <strong>Community:</strong> {profile[0].address.city}
          </Card.Text>
          <Card.Text>
            {/* <br></br> */}
            <p>
              <strong>Bio:</strong> This is a sample bio. I am a nurse at Duke
              hospital specializing in oncology. I have lived in this community
              for 10 years and am happy to help.
            </p>
            <hr></hr>
            {/* <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>Offer</Accordion.Header>
                <Accordion.Body>{offer.text}</Accordion.Body>
              </Accordion.Item>
            </Accordion> */}
          </Card.Text>
        </Card.Body>
        <Card.Footer className="card-footer">
          <Button className="back-button" onClick={handleBackButton}>
            Back
          </Button>
        </Card.Footer>
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
  }
  #accept {
    background-color: #89b173;
  }
  .card-header {
    background-color: #ab417f;
    color: white;
    .avatar-container {
      height: 7vh;
      width: 7vh;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .user-pic {
      height: 100%;
      width: 100%;
      object-fit: cover;
      border-radius: 50%;
      margin-right: 1rem;
    }
  }
  .card-footer {
    background-color: #ab417f;
    color: white;
    /* display: flex;
    align-items: center;
    justify-content: space-around; */
    cursor: pointer;
    .back-button {
      background-color: #ee977c;
      border: none;
    }
  }
`;

export default HealthCard;
