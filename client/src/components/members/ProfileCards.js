import HealthCard from "./HealthCard";
import CommunityCard from "./CommunityCard";

const ProfileCard = ({ profile }) => {
  const healcareMember = "healthcare member";
  return (
    <>
      {profile[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
      healcareMember.replace(/\s+/g, "").trim().toLowerCase() ? (
        <HealthCard profile={profile} />
      ) : (
        <CommunityCard profile={profile} />
      )}
    </>
  );
};

export default ProfileCard;
