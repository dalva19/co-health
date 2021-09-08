//styling
import { Row, Container } from "react-bootstrap";

//individual request items
const Request = (request) => {
  return (
    <div className="contactContainer">
      <div>
        <p className="request-username">{request.request.username}</p>
        <p className="request-text">{request.request.text}</p>
      </div>
    </div>
  );
};

export default Request;
