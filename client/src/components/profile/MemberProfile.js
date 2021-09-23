import { useSelector } from "react-redux";
//components
import HealthcareContainer from "./HealthcareContainer";
import CommunityContainer from "./CommunityContainer";
//style
import styled from "styled-components";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);
  const healthcareMember = "healthcare member";

  //loads with profile info based on who is logged in
  return (
    <>
      <MemberProfileContainer>
        {member[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
        healthcareMember.replace(/\s+/g, "").trim().toLowerCase() ? (
          <HealthcareContainer />
        ) : (
          <CommunityContainer />
        )}
      </MemberProfileContainer>
    </>
  );
};

const MemberProfileContainer = styled.div`
  /* padding-top: 1rem; */
`;

export default MemberProfile;
