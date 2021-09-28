import { Alert } from "react-bootstrap";

const License = ({ license }) => {
  return (
    <>
      {license.status === "active" ? (
        <Alert variant="success">
          <Alert.Heading>Your license is active.</Alert.Heading>
        </Alert>
      ) : (
        <Alert variant="danger">
          <Alert.Heading>Your license is inactive.</Alert.Heading>
          <p>
            You cannot participate as a healthcare member at this time. Please
            re-submit your information and try again.
          </p>
        </Alert>
      )}
    </>
  );
};

export default License;
