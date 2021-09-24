import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
//components
import Offers from "../offers/Offers";
import OfferForm from "../offers/OfferForm";
import HealthcareLicenseForm from "../account-creation/HealthcareLiscenceForm";
import Pagination from "../nav/Pagination";
import SettingsForm from "../account-creation/SettingsForm";
//actions
import { getCommunityRequests } from "../../actions/communityRequestsActions";
import { getOffers, offersLoading } from "../../actions/offerActions";
//styling
import styled from "styled-components";
import { Button } from "react-bootstrap";

const HealthCareProfile = () => {
  //loads with profile info based on who is logged in
  const dispatch = useDispatch();

  const [modal, setModal] = useState("");
  const { member } = useSelector((state) => state.member);
  const { credentials } = useSelector((state) => state.member.member[0]);
  const { offers, isLoading } = useSelector((state) => state.offers);
  const { name } = useSelector((state) => state.member.member[0]);
  const license = useSelector((state) => state.license.license[0]);
  const itemCount = useSelector((state) => state.offers.count);
  const [page, setPage] = useState(1);

  const handleShowLicenseModal = () => {
    setModal("license-modal");
  };

  const handleShowOfferModal = () => {
    setModal("offer-modal");
  };

  const handleShowSettingsModal = () => {
    setModal("settings-modal");
  };

  const handleClose = () => {
    setModal("close");
  };

  useEffect(() => {
    if (credentials.verified) {
      dispatch(getCommunityRequests());
    }
  }, [dispatch, credentials.verified]);

  useEffect(() => {
    if (member[0].offers.length > 0) {
      dispatch(offersLoading());
      dispatch(getOffers(page));
    }
  }, [dispatch, page, member]);

  return (
    <>
      {!credentials.verified ? (
        <>
          <h2>
            You must submit your license information for verification before
            getting started.
          </h2>
          <Button onClick={handleShowLicenseModal}>Verify License</Button>
        </>
      ) : (
        ""
        // <button onClick={handleShowOfferModal}>testing map</button>
      )}

      {!member[0].address.city ? (
        <>
          <h2>
            Please submit your address information to set your default
            community.
          </h2>{" "}
          <Button onClick={handleShowSettingsModal}>Settings</Button>
        </>
      ) : (
        ""
      )}

      {/* {member[0].offers.length === 0 && credentials.verified ? (
        <h3>Make an offer</h3>
      ) : (
        ""
      )} */}

      {!isLoading ? (
        <>
          <Offers offers={offers} />
        </>
      ) : (
        ""
      )}

      <Pagination page={page} setPage={setPage} itemCount={itemCount} />

      <HealthcareLicenseForm
        show={modal === "license-modal"}
        handleClose={handleClose}
      />

      <SettingsForm
        show={modal === "settings-modal"}
        handleClose={handleClose}
      />

      <OfferForm
        show={modal === "offer-modal"}
        handleClose={handleClose}
        page={page}
      />
    </>
  );
};

const ProfileContainer = styled.div`
  /* padding-top: 5vh; */
  padding-left: 2rem;
`;

export default HealthCareProfile;
