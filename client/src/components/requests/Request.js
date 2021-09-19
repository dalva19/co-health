import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest, getRequests } from "../../actions/requestActions";
import { getMemberProfile } from "../../actions/memberActions";
import EditRequest from "./EditRequest";
import OfferAlert from "../offers/OfferAlert";
//styling
import { Card, Badge, CloseButton } from "react-bootstrap";
import styled from "styled-components";

//individual request items
const Request = ({ request }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { requests } = useSelector((state) => state.requests);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRequest(request._id));
    dispatch(getMemberProfile());
  };

  const handleOffersButton = () => {
    if (!showAlert) {
      setShowAlert(true);
      dispatch(getMemberProfile());
      dispatch(getRequests());
    } else {
      setShowAlert(false);
    }
  };

  //useEffect to load profile so new on offer badge will show??
  //add loaded false to requests reducer to see if i can get this work with the useeffect
  // useEffect(() => {
  //   dispatch(getMemberProfile());
  //   dispatch(getRequests());
  // }, [dispatch]);

  return (
    <>
      <StyledCard>
        <Card border="secondary" style={{ width: "18rem", height: "18rem" }}>
          <Card.Header className="card-header">
            Status: {request.status}
            <CloseButton onClick={handleDelete} />
          </Card.Header>
          <Card.Body>
            <Card.Title>Request</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {request.username}
            </Card.Subtitle>
            <Card.Text>{request.text}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <StyledFooter>
              {/* <p onClick={handleDelete}>Delete</p> */}
              <p onClick={handleShow}>Edit</p>
              {request.offers.length > 0 ? (
                <p onClick={handleOffersButton}>
                  Offers <Badge bg="danger">New</Badge>
                </p>
              ) : (
                <p onClick={handleOffersButton}>Offers </p>
              )}
            </StyledFooter>
          </Card.Footer>
        </Card>
        {showAlert ? <OfferAlert request={request} /> : ""}
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
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

export default Request;
