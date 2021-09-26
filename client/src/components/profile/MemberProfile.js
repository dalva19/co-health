import { useSelector } from "react-redux";
//components
import HealthcareContainer from "./HealthcareContainer";
import CommunityContainer from "./CommunityContainer";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);
  const healthcareMember = "healthcare member";

  //loads with profile container based on who is logged in
  return (
    <>
      {member[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
      healthcareMember.replace(/\s+/g, "").trim().toLowerCase() ? (
        <HealthcareContainer />
      ) : (
        <CommunityContainer />
      )}
    </>
  );
};

export default MemberProfile;
