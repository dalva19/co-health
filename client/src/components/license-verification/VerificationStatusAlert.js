import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import License from "./LicenseAlert";

const VerificationStatusAlert = () => {
  const license = useSelector((state) => state.license.license[0]);

  return (
    <>
      {!license ? (
        <Alert variant="danger">
          <Alert.Heading>No license found.</Alert.Heading>
          <p>
            You cannot participate as a healthcare member at this time. Please
            re-submit your information and try again.
          </p>
        </Alert>
      ) : (
        <License license={license} />
      )}
    </>
  );
};

export default VerificationStatusAlert;
