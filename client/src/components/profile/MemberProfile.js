import { useSelector } from "react-redux";
//components
import HealthcareContainer from "./HealthcareContainer";
import CommunityProfile from "./CommunityProfile";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);
  const healthcareMember = "healthcare member";

  //loads with profile based on who is logged in
  return (
    <>
      {member[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
      healthcareMember.replace(/\s+/g, "").trim().toLowerCase() ? (
        <HealthcareContainer />
      ) : (
        <CommunityProfile />
      )}
    </>
  );
};

export default MemberProfile;
