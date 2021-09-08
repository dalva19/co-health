import Request from "./Request";
//styling
import { Row, Container } from "react-bootstrap";

//map requests to make ind request
const Requests = (requests) => {
  return (
    <>
      <div className="requests">
        {requests.requests.map((request, i) => (
          <div key={i}>
            <Request request={request} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Requests;
