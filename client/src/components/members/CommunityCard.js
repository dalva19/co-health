import React from "react";
import { useHistory } from "react-router";
// import { useSelector } from "react-redux";
//styling
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const CommunityCard = ({ profile }) => {
  const history = useHistory();
  // const request = useSelector((state) => state.requests.selectedRequest);
  const handleBackButton = () => {
    history.push("/profile");
  };

  return (
    <>
      <StyledCard>
        <Card style={{ width: "30rem", height: "30rem" }}>
          <Card.Header className="card-header">
            <div className="avatar-container">
              {profile[0].avatar ? (
                <>
                  <img className="user-pic" src={profile[0].avatar} alt="Pic" />
                  <h3>{profile[0].username}</h3>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="icon fa-3x plus "
                  />
                  <h3>{profile[0].username}</h3>
                </>
              )}
            </div>
          </Card.Header>

          <Card.Body className="body">
            <Card.Title>
              {profile[0].name.firstName ? profile[0].name.firstName : ""}
              {"  "}
              {profile[0].name.lastName ? profile[0].name.lastName : ""}
            </Card.Title>
            <Card.Text>
              <strong>Community:</strong> {profile[0].address.city}
            </Card.Text>
            <Card.Text>
              {/* <br></br> */}
              <p>
                <strong>Bio:</strong> {profile[0].bio ? profile[0].bio : ""}
              </p>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="card-footer">
            <Button className="back-button" onClick={handleBackButton}>
              Back
            </Button>
          </Card.Footer>
        </Card>
      </StyledCard>
    </>
  );
};

const StyledCard = styled.div`
  margin-top: 2rem;
  padding-left: 30rem;
  .card {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
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

export default CommunityCard;
