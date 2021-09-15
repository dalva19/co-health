import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//styling
import { Card, Accordion } from "react-bootstrap";
import styled from "styled-components";

//individual offer items
const Offer = ({ offer }) => {
  // const [selectRequest, setSelectRequest] = useState("");
  // const [show, setShow] = useState(false);
  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const offers = useSelector((state) => state.offers.offers);

  // const dispatch = useDispatch();

  // const handleDelete = () => {
  //   dispatch(deleteRequest(request._id));
  // };

  return (
    <>
      <StyledCard>
        <Card border="secondary" style={{ width: "18rem", height: "18rem" }}>
          <Card.Header>Status: {offer.status}</Card.Header>
          <Card.Body>
            <Card.Title>{offer.request.text}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {offer.username}
            </Card.Subtitle>
            <Card.Text>{offer.text}</Card.Text>
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
            </StyledFooter>
          </Card.Footer>
        </Card>
      </StyledCard>

      {/* <EditRequest
        request={request}
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      /> */}
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

export default Offer;
