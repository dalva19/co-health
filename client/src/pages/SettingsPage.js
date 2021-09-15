import React from "react";
import { useSelector } from "react-redux";
import Settings from "../components/profile/Settings";
import { Spinner } from "react-bootstrap";

const SettingsPage = () => {
  const member = useSelector((state) => state.member.member[0]);
  console.log(member);

  return (
    <>
      {member ? (
        <Settings />
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

export default SettingsPage;
