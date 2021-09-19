import { useDispatch } from "react-redux";
import { editRequestOfferStatus } from "../../actions/requestActions";
//styling
import { Alert, Button } from "react-bootstrap";

const OfferAlert = ({ request }) => {
  //add functionality to change status to offer accepted
  const dispatch = useDispatch();
  const handleAcceptButton = (e) => {
    e.preventDefault();
    const offerId = e.target.value;
    const body = {
      status: "offer accepted",
    };
    dispatch(editRequestOfferStatus(offerId, body));
  };
  return (
    <>
      {request.offers.map((offer, index) => (
        <Alert
          variant="warning"
          className="offer-alert"
          key={index}
          dismissible
        >
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
            <Button variant="outline-danger">Decline</Button>
          </div>
        </Alert>
      ))}
    </>
  );
};

export default OfferAlert;
