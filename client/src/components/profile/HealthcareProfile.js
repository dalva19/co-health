import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { withScriptjs, withGoogleMap } from "react-google-maps";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
//components
import NavigationTabs from "./NavigationTabs";
import ProfileMap from "./ProfileMap";
import Offers from "../offers/Offers";
import OfferForm from "../offers/OfferForm";
import HealthcareLicenseForm from "./HealthcareLiscenceForm";
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
  const memberLoaded = useSelector((state) => state.member);
  const { offers, loaded } = useSelector((state) => state.offers);
  const [modal, setModal] = useState("");
  const WrappedMap = withScriptjs(withGoogleMap(ProfileMap));

  const handleShowLicenseModal = () => {
    setModal("license-modal");
  };

  const handleShowOfferModal = () => {
    setModal("offer-modal");
  };

  const handleClose = () => {
    setModal("close");
  };

  useEffect(() => {
    if (credentials.verified) {
      dispatch(getOffers());
      dispatch(getCommunityRequests());
    }
  }, [dispatch]);

  console.log(offers);

  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile" />
      {!credentials.verified ? (
        <>
          <h2>You must submit your license information for verification</h2>
          <button onClick={handleShowLicenseModal}>Verify License</button>
        </>
      ) : (
        ""
        // <button onClick={handleShowOfferModal}>testing map</button>
      )}
      {loaded ? (
        <>
          {/* <ProfileContainer>
            <h2>Offer cards</h2>
          </ProfileContainer> */}
          {/* <ProfileMap /> */}
          <div style={{ width: "100vw", height: "100vh" }}>
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            />
          </div>
          <Offers offers={offers} />
        </>
      ) : (
        ""
        // <Spinner animation="border" role="status">
        //   <span className="visually-hidden">Loading...</span>
        // </Spinner>
      )}

      <HealthcareLicenseForm
        show={modal === "license-modal"}
        handleClose={handleClose}
      />

      <OfferForm
        // requestId={requestId}
        show={modal === "offer-modal"}
        // setShow={setShow}
        handleClose={handleClose}
        // handleShow={handleShow}
      />
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
