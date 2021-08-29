import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import MemberProfile from "../components/profile/MemberProfile";

const MemberPage = () => {
  const { loaded } = useSelector((state) => state.member);

  return (
    <>
      {loaded ? (
        <MemberProfile />
      ) : (
        <Route exact path="/co-health/profile">
          <Redirect to="/" />
        </Route>
      )}
    </>
  );
};

export default MemberPage;
