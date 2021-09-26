import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
import { Button, Row, Col } from "react-bootstrap";

const HealthCareProfile = () => {
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

  const history = useHistory();

  useEffect(() => {
    if (credentials.verified) {
      dispatch(getCommunityRequests());
    } else {
      history.push("/co-health/verify-license");
    }
  }, [dispatch, credentials.verified, history]);

  useEffect(() => {
    if (member[0].offers.length > 0) {
      dispatch(offersLoading());
      dispatch(getOffers(page));
    }
  }, [dispatch, page, member]);

  return (
    <>
      {!member[0].address.city ? (
        <StyledSetDefault>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <h1>
                Please submit your address information to set your default
                community.
              </h1>
              <Button
                className="settings-button"
                onClick={handleShowSettingsModal}
              >
                Settings
              </Button>
            </Col>
          </Row>
        </StyledSetDefault>
      ) : (
        ""
      )}

      {!isLoading ? (
        <>
          <Offers offers={offers} />
        </>
      ) : (
        <StyledMakeAnOffer>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h2>
                Click on a <span>marker</span> to make an offer!
              </h2>
            </Col>
          </Row>
        </StyledMakeAnOffer>
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

const StyledSetDefault = styled.div`
  margin-top: 2rem;
  height: 50vh;
  padding: 5rem 10rem;
  h1 {
    font-weight: lighter;
  }
  .settings-button {
    margin-left: 25rem;
    margin-top: 4rem;
    padding: 0.5rem 1rem 0.5rem 1rem;
    background-color: #ab417f;
    border: none;
  }
`;

const StyledMakeAnOffer = styled.div`
  margin-top: 5rem;
  height: 50vh;
  padding: 5rem 10rem;
  h2 {
    font-weight: lighter;
  }
  span {
    color: #f18457;
    font-weight: bold;
    font-style: italic;
  }
`;

export default HealthCareProfile;
