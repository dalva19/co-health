import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";
import MemberProfile from "../components/profile/MemberProfile";
import NavigationTabs from "../components/profile/NavigationTabs";

const MemberPage = () => {
  const { loaded } = useSelector((state) => state.member);

  return (
    <>
      {loaded ? (
        <>
          <NavigationTabs defaultActiveKey="/co-health/profile" />
          <MemberProfile />
        </>
      ) : (
        <>
          <Route exact path="/co-health/profile">
            <Redirect to="/" />
          </Route>
        </>
      )}
    </>
  );
};

export default MemberPage;
