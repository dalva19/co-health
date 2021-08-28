import React from "react";
import { useSelector } from "react-redux";
//components
import HealthCareProfile from "./HealthcareProfile";
import CommunityProfile from "./CommunityProfile";
import styled from "styled-components";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);

  //loads with profile info based on who is logged in
  return (
    <>
      <MemberProfileContainer>
        {member.profileType === "healthcare member" ? (
          <HealthCareProfile />
        ) : (
          <CommunityProfile />
        )}
      </MemberProfileContainer>
    </>
  );
};

const MemberProfileContainer = styled.div`
  padding-top: 5vh;
`;

export default MemberProfile;
