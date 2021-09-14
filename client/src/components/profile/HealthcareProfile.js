import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//components
import NavigationTabs from "./NavigationTabs";
import ProfileMap from "./ProfileMap";

import { getCommunityRequests } from "../../actions/communityRequestsActions";
import { getOffers } from "../../actions/offerActions";
//styling
import styled from "styled-components";

const HealthCareProfile = () => {
  //loads with profile info based on who is logged in
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.member.member[0]);
  const WrappedMap = withScriptjs(withGoogleMap(ProfileMap));

  useEffect(() => {
    dispatch(getOffers());
    dispatch(getCommunityRequests());
  }, [dispatch]);

  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile" />

      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>

      <ProfileContainer>
        <FontAwesomeIcon icon={faPlus} className="icon fa-2x plus " />
        <p>Make an offer</p>

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
