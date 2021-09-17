//styling
import { Alert, Button } from "react-bootstrap";

const OfferAlert = ({ request }) => {
  //add functionality to change status to offer accepted
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
            <Button variant="outline-success">Accept</Button>
            <Button variant="outline-danger">Decline</Button>
          </div>
        </Alert>
      ))}
    </>
  );
};

export default OfferAlert;
