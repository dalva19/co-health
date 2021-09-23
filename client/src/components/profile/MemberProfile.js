import { useSelector } from "react-redux";
import { withScriptjs, withGoogleMap } from "react-google-maps";
//components
import HealthCareProfile from "./HealthcareProfile";
import CommunityProfile from "./CommunityProfile";
import ProfileMap from "./ProfileMap";
//style
import styled from "styled-components";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);
  const healthcareMember = "healthcare member";
  const communityMember = "community member";
  const WrappedMap = withScriptjs(withGoogleMap(ProfileMap));

  //loads with profile info based on who is logged in
  return (
    <>
      <MemberProfileContainer>
        {member[0].profileType.replace(/\s+/g, "").trim().toLowerCase() ===
        healthcareMember.replace(/\s+/g, "").trim().toLowerCase() ? (
          <>
            <div style={{ width: "100vw", height: "100vh" }}>
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
            </div>
            <HealthCareProfile />
          </>
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
