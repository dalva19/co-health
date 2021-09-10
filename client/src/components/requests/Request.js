import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRequest } from "../../actions/requestActions";
import EditRequest from "./EditRequest";
//styling
import { Card, Accordion } from "react-bootstrap";
import styled from "styled-components";

//individual request items
const Request = ({ request }) => {
  const [selectRequest, setSelectRequest] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteRequest(request._id));
  };
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
            {/* <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Offers</Accordion.Header>
              <Accordion.Body>Testing</Accordion.Body>
            </Accordion.Item>
          </Accordion> */}
          </Card.Body>
          <Card.Footer>
            <StyledFooter>
              <p onClick={handleDelete}>Delete</p>
              <p onClick={handleShow}>Edit</p>
              <p>Offers</p>
            </StyledFooter>
          </Card.Footer>
        </Card>
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
`;

const StyledFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

export default Request;
