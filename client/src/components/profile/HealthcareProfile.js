import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withScriptjs, withGoogleMap } from "react-google-maps";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
//components
import NavigationTabs from "./NavigationTabs";
import ProfileMap from "./ProfileMap";
import Offers from "../offers/Offers";
//actions
import { getCommunityRequests } from "../../actions/communityRequestsActions";
import { getOffers } from "../../actions/offerActions";
//styling
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const HealthCareProfile = () => {
  //loads with profile info based on who is logged in
  const dispatch = useDispatch();
  const { credentials } = useSelector((state) => state.member.member[0]);
  const { offers, loaded } = useSelector((state) => state.offers);
  const WrappedMap = withScriptjs(withGoogleMap(ProfileMap));

  useEffect(() => {
    dispatch(getOffers());
    dispatch(getCommunityRequests());
  }, [dispatch]);

  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile" />
      {loaded ? (
        <>
          <div style={{ width: "100vw", height: "100vh" }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            />
          </div>

          <ProfileContainer>
            <h2>Offer cards</h2>
          </ProfileContainer>

          <Offers offers={offers} />
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
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
