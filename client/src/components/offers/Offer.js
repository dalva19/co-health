import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteOffer } from "../../actions/offerActions";
import EditOffer from "./EditOffer";
//styling
import { Card, CloseButton } from "react-bootstrap";
import styled from "styled-components";

//individual offer items
const Offer = ({ offer }) => {
  // const [selectRequest, setSelectRequest] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteOffer(offer._id));
  };

  return (
    <>
      {offer.request ? (
        <StyledCard>
          <Card border="secondary" style={{ width: "18rem", height: "18rem" }}>
            <Card.Header className="card-header">
              Status: {offer.status}
              <CloseButton onClick={handleDelete} />
            </Card.Header>

            <Card.Body>
              <Card.Title>{offer.request.text}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {offer.username}
              </Card.Subtitle>
              <Card.Text>{offer.text}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <StyledFooter>
                <p onClick={handleDelete}>Delete</p>
                <p onClick={handleShow}>Edit</p>
              </StyledFooter>
            </Card.Footer>
          </Card>
        </StyledCard>
      ) : (
        ""
        //add placeholder card?
        // <Spinner animation="border" role="status">
        //   <span className="visually-hidden">Loading...</span>
        // </Spinner>
      )}

      <EditOffer
        offer={offer}
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

export default Offer;
