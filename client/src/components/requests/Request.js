import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRequest } from "../../actions/requestActions";
import EditRequest from "./EditRequest";
import OfferAlert from "../offers/OfferAlert";
//styling
import { Card, Badge } from "react-bootstrap";
import styled from "styled-components";

//individual request items
const Request = ({ request }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRequest(request._id));
  };

  const handleOffersButton = () => {
    if (!showAlert) {
      setShowAlert(true);
    } else {
      setShowAlert(false);
    }
  };

  //functionality to have new badge show up on offers button
  //close button for requests to delete
  return (
    <>
      <StyledCard>
        <Card border="secondary" style={{ width: "18rem", height: "18rem" }}>
          <Card.Header>Status: {request.status}</Card.Header>
          <Card.Body>
            <Card.Title>Request</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {request.username}
            </Card.Subtitle>
            <Card.Text>{request.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <StyledFooter>
              <p onClick={handleDelete}>Delete</p>
              <p onClick={handleShow}>Edit</p>
              <p onClick={handleOffersButton}>
                Offers <Badge bg="danger">New</Badge>
              </p>
            </StyledFooter>
          </Card.Footer>
        </Card>
        {showAlert ? (
          <OfferAlert request={request} />
        ) : (
          // <Alert variant="success" className="offer-alert">
          //   <Alert.Heading>Hey, nice to see you</Alert.Heading>
          //   <p>Offers</p>
          // </Alert>
          ""
        )}
      </StyledCard>

      <EditRequest
        request={request}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

const StyledCard = styled.div`
  padding-left: 1rem;
  .offer-alert {
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

export default Request;
