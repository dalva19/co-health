import React from "react";
import { useSelector } from "react-redux";
import ProfileCard from "./HealthCard";
//styling
import { Alert, Button } from "react-bootstrap";

const PublicProfile = () => {
  const { profile, isLoading } = useSelector((state) => state.profile);

  return <>{!isLoading ? <ProfileCard profile={profile} /> : ""}</>;
};

export default PublicProfile;
