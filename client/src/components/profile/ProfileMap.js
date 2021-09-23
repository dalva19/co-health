import { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useSelector } from "react-redux";
import OfferForm from "../offers/OfferForm";
//styling
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const ProfileMap = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [requestId, setRequestId] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { requests } = useSelector((state) => state.communityRequests);
  const { coordinates } = useSelector((state) => state.member.member[0]);

  const handleMakeAnOffer = (e) => {
    setRequestId(e.target.id);
    handleShow();
  };

  const handleUsername = (e) => {
    //view public profile of community member
    //make link in router on App.js
    //link here on click
    //server route already in place /user/:id
    setRequestId(e.target.id);
    handleShow();
  };

  return (
    <>
      {requests ? (
        <>
          <div>
            <GoogleMap
              defaultZoom={10}
              defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
            >
              {requests.map((data) => (
                <Marker
                  key={requests.indexOf(data)}
                  position={{
                    lat: data.coordinates.lat,
                    lng: data.coordinates.lng,
                  }}
                  onClick={() => setSelectedData(data)}
                />
              ))}
              {selectedData && (
                <InfoWindow
                  position={{
                    lat: selectedData.coordinates.lat,
                    lng: selectedData.coordinates.lng,
                  }}
                  onCloseClick={() => setSelectedData(null)}
                >
                  <StyledInfo>
                    <h2 id={selectedData._id} onClick={handleUsername}>
                      {selectedData.username}
                    </h2>
                    <p>{selectedData.text}</p>
                    <p
                      className="offer-link"
                      id={selectedData._id}
                      onClick={handleMakeAnOffer}
                    >
                      Make an offer
                    </p>
                  </StyledInfo>
                </InfoWindow>
              )}
            </GoogleMap>
          </div>
          <OfferForm
            requestId={requestId}
            show={show}
            setShow={setShow}
            handleClose={handleClose}
            handleShow={handleShow}
          />
        </>
      ) : (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </>
  );
};

const StyledInfo = styled.div`
  .offer-link {
    cursor: pointer;
  }
`;

export default ProfileMap;
