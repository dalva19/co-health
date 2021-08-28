import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//components
import NavigationTabs from "./NavigationTabs";
//styling
import styled from "styled-components";

const HealthCareProfile = () => {
  //loads with profile info based on who is logged in
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile" />
      <ProfileContainer>
        <FontAwesomeIcon icon={faPlus} className="icon fa-2x plus " />
        <p>Make an offer</p>

        <br></br>
        <br></br>
        <h1>Healthcare Member</h1>
        <h2>Requests cards</h2>
        <h2>MAP and connections</h2>
      </ProfileContainer>
    </>
  );
};

const ProfileContainer = styled.div`
  /* padding-top: 5vh; */
  padding-left: 2rem;

  .plus {
    cursor: pointer;
  }
`;

export default HealthCareProfile;
