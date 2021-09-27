import { useSelector } from "react-redux";
import { withScriptjs, withGoogleMap } from "react-google-maps";
//components
import HealthCareProfile from "./HealthcareProfile";
import ProfileMap from "./ProfileMap";
import HomeMap from "../home/HomeMap";
//style
import styled from "styled-components";

const HealthcareContainer = () => {
  const { member } = useSelector((state) => state.member);
  const coordinates = member[0].coordinates;
  const WrappedProfileMap = withScriptjs(withGoogleMap(ProfileMap));
  const WrappedMap = withScriptjs(withGoogleMap(HomeMap));

  return (
    <>
      <>
        {coordinates ? (
          <>
            <div style={{ width: "100vw", height: "80vh" }}>
              <WrappedProfileMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
            </div>
            <HealthProfileContainer>
              <HealthCareProfile />
            </HealthProfileContainer>
          </>
        ) : (
          <>
            <div style={{ width: "100vw", height: "80vh" }}>
              <WrappedMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />
              <HealthProfileContainer>
                <HealthCareProfile />
              </HealthProfileContainer>
            </div>
          </>
        )}
      </>
    </>
  );
};

const HealthProfileContainer = styled.div`
  height: 70vh;
`;

export default HealthcareContainer;
