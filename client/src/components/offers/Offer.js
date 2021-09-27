import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteOffer } from "../../actions/offerActions";
import EditOffer from "./EditOffer";
//styling
import { Card, CloseButton, Badge } from "react-bootstrap";
import styled from "styled-components";

//individual offer items
const Offer = ({ offer }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { isLoading } = useSelector((state) => state.offers);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteOffer(offer._id));
  };

  return (
    <>
      {!isLoading ? (
        <StyledCard>
          <Card
            className={
              offer.status === "offer accepted" ? "card-border" : "card"
            }
            style={{ width: "18rem", height: "18rem" }}
          >
            <Card.Header
              className="card-header"
              id={offer.status === "offer accepted" ? "accept" : ""}
            >
              Status: {offer.status}
              <CloseButton onClick={handleDelete} />
            </Card.Header>

            <Card.Body>
              <Card.Title className="username">
                {offer.request.username}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {offer.request.text}
              </Card.Subtitle>
              <Card.Text>
                {"->"}
                {offer.text}
              </Card.Text>
            </Card.Body>
            <Card.Footer
              className="card-footer"
              id={offer.status === "offer accepted" ? "accept" : ""}
            >
              {/* <p onClick={handleDelete}>Delete</p> */}
              <p onClick={handleShow}>Edit</p>
            </Card.Footer>
          </Card>
        </StyledCard>
      ) : (
        ""
        // <PlaceHolderCard />
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
  margin-top: 2rem;
  padding-left: 1rem;
  .card {
    box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.2);
  }
  .card-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .username {
    cursor: pointer;
    &:hover {
      color: #f5aa6f;
    }
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

export default Offer;
