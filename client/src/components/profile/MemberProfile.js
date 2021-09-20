import { useSelector } from "react-redux";
//components
import HealthCareProfile from "./HealthcareProfile";
import CommunityProfile from "./CommunityProfile";
import styled from "styled-components";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);
  const healthcareMember = "healthcare member";
  const communityMember = "community member";

  //loads with profile info based on who is logged in
  return (
    <>
      <MemberProfileContainer>
        {member[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
        healthcareMember.replace(/\s+/g, "").trim().toLowerCase() ? (
          <HealthCareProfile />
        ) : (
          ""
        )}

        {member[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
        communityMember.replace(/\s+/g, "").trim().toLowerCase() ? (
          <CommunityProfile />
        ) : (
          ""
        )}
      </MemberProfileContainer>
    </>
  );
};

const MemberProfileContainer = styled.div`
  /* padding-top: 1rem; */
`;

export default MemberProfile;
