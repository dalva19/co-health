import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRequest } from "../../actions/requestActions";
import { getMemberProfile } from "../../actions/memberActions";
import EditRequest from "./EditRequest";
import OfferAlert from "../offers/OfferAlert";
//styling
import { Card, Badge, CloseButton, Spinner } from "react-bootstrap";
import styled from "styled-components";

//individual request items
const Request = ({ request, page }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRequest(request._id));
    dispatch(getMemberProfile());
  };

  const handleOffersButton = () => {
    if (!showAlert) {
      setShowAlert(true);
      dispatch(getMemberProfile());
      // dispatch(getRequests(page));
    } else {
      setShowAlert(false);
    }
  };

  return (
    <>
      <StyledCard>
        <Card style={{ width: "18rem", height: "18rem" }}>
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
        {showAlert ? <OfferAlert request={request} key={request._id} /> : ""}
      </StyledCard>

      <EditRequest
        request={request}
        page={page}
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
  .card {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .card-header {
    background-color: #ee977c;
    color: white;
  }
  .card-footer {
    background-color: #ee977c;
    color: white;
    /* display: flex;
    align-items: center;
    justify-content: space-around; */
    cursor: pointer;
  }
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

export default Request;
