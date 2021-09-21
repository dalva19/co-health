import { useDispatch } from "react-redux";
import { editRequestOfferStatus } from "../../actions/requestActions";
import { createChat } from "../../actions/chatActions";
//styling
import { Alert, Button } from "react-bootstrap";

const OfferAlert = ({ request }) => {
  const dispatch = useDispatch();
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

  return (
    <>
      {request.offers.map((offer, index) => {
        if (
          offer.status.replace(/\s+/g, "").trim().toLowerCase() ===
          offerAccepted.replace(/\s+/g, "").trim().toLowerCase()
        ) {
          return (
            <Alert variant="warning" className="offer-alert" key={index}>
              <Alert.Heading>{offer.username}</Alert.Heading>
              <p>{offer.text}</p>
              <hr />
              <div className="d-flex justify-content-end">
                <p>{offer.username} is now a contact.</p>
              </div>
            </Alert>
          );
        } else if (offer.status === "pending") {
          return (
            <Alert variant="warning" className="offer-alert" key={index}>
              <Alert.Heading>{offer.username}</Alert.Heading>
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

export default OfferAlert;
