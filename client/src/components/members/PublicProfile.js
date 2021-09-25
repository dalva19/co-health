import React from "react";
import { useSelector } from "react-redux";
import ProfileCards from "./ProfileCards";

const PublicProfile = () => {
  const { profile, isLoading } = useSelector((state) => state.profile);

  return <>{!isLoading ? <ProfileCards profile={profile} /> : ""}</>;
};

export default PublicProfile;
