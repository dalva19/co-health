import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { editRequestOfferStatus } from "../../actions/requestActions";
import { createChat } from "../../actions/chatActions";
import { getProfile } from "../../actions/profilesActions";
import { getRequest } from "../../actions/requestActions";
//styling
import { Alert, Button } from "react-bootstrap";
import styled from "styled-components";

const OfferAlert = ({ request }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const offerAccepted = "offer accepted";

  const handleAcceptButton = (e) => {
    e.preventDefault();
    const offerId = e.target.value;
    const body = {
      status: "offer accepted",
    };
    dispatch(editRequestOfferStatus(offerId, body));
    dispatch(createChat(offerId));
  };

  const handleDeclineButton = (e) => {
    e.preventDefault();
    const offerId = e.target.value;
    const body = {
      status: "offer declined",
    };
    dispatch(editRequestOfferStatus(offerId, body));
  };

  const handleUsernameClick = (e) => {
    const userId = e.target.id;
    dispatch(getProfile(userId));
    dispatch(getRequest(request._id));
    history.push(`/co-health/profile/${userId}`);
  };

  return (
    <>
      {request.offers.map((offer, index) => {
        if (
          offer.status.replace(/\s+/g, "").trim().toLowerCase() ===
          offerAccepted.replace(/\s+/g, "").trim().toLowerCase()
        ) {
          return (
            <StyledAlert>
              <Alert variant="warning" className="offer-alert" key={index}>
                <Alert.Heading
                  className="alert-header"
                  id={offer.user}
                  onClick={handleUsernameClick}
                >
                  {offer.username}
                </Alert.Heading>
                <p>{offer.text}</p>
                <hr />
                <div className="d-flex justify-content-end">
                  <p>{offer.username} is now a contact.</p>
                </div>
              </Alert>
            </StyledAlert>
          );
        } else if (offer.status === "pending") {
          return (
            <Alert variant="warning" className="offer-alert" key={index}>
              <Alert.Heading
                className="alert-header-2"
                id={offer.user}
                onClick={handleUsernameClick}
              >
                {offer.username}
              </Alert.Heading>
              <p>{offer.text}</p>
              <hr />
              <div className="d-flex justify-content-end">
                <Button
                  variant="outline-success"
                  onClick={handleAcceptButton}
                  value={offer._id}
                >
                  Accept
                </Button>
                <Button
                  variant="outline-danger"
                  onClick={handleDeclineButton}
                  value={offer._id}
                >
                  Decline
                </Button>
              </div>
            </Alert>
          );
        }
        return "";
      })}
    </>
  );
};

const StyledAlert = styled.div`
  .alert-header {
    cursor: pointer;
  }
`;

export default OfferAlert;
