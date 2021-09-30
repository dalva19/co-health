import React from "react";
import { useSelector } from "react-redux";
import Settings from "../components/profile/Settings";
import NavigationTabs from "../components/nav/NavigationTabs";
// import { Spinner } from "react-bootstrap";

const SettingsPage = () => {
  const member = useSelector((state) => state.member.member[0]);

  return (
    <>
      {member ? (
        <>
          <NavigationTabs defaultActiveKey="/profile/settings" />
          <Settings />
        </>
      ) : (
        ""
        // <Spinner animation="border" role="status">
        //   <span className="visually-hidden">Loading...</span>
        // </Spinner>
      )}
    </>
  );
};

export default SettingsPage;
