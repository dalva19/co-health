import { useState } from "react";
//components
import NavigationTabs from "./NavigationTabs";
import SettingsForm from "./SettingsForm";
//styling
import { Button } from "react-bootstrap";

const Settings = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //loads with profile info based on who is logged in
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile/settings" />
      <h2>this is the settings page</h2>

      <Button onClick={handleShow}>Manage Settings</Button>

      <SettingsForm
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

export default Settings;
