import React from "react";
import { useSelector } from "react-redux";
import MemberProfile from "../components/profile/MemberProfile";

const MemberPage = () => {
  const { loaded } = useSelector((state) => state.member);

  return (
    <>
      {loaded ? (
        <MemberProfile />
      ) : (
        <h2>You must be logged in to view profile.</h2>
      )}
    </>
  );
};

export default MemberPage;
