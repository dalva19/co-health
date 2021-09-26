import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useSelector } from "react-redux";
import { getProfile } from "../../actions/profilesActions";
//components
import OfferForm from "../offers/OfferForm";
//styling
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const ProfileMap = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedData, setSelectedData] = useState(null);
  const [requestId, setRequestId] = useState("");
  const { requests } = useSelector((state) => state.communityRequests);
  const { coordinates } = useSelector((state) => state.member.member[0]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleMakeAnOffer = (e) => {
    setRequestId(e.target.id);
    handleShow();
  };

  const handleUsername = (e) => {
    //view public profile of community member
    const userId = e.target.id;
    dispatch(getProfile(userId));
    history.push(`/co-health/profile/${userId}`);
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
                    <h2
                      className="username"
                      id={selectedData.user}
                      onClick={handleUsername}
                    >
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
  .username {
    cursor: pointer;
    color: #ab417f;
    &:hover {
      color: #fad39e;
    }
  }
  .offer-link {
    cursor: pointer;
    text-decoration: underline;
    &:hover {
      color: #8ab073;
    }
  }
`;

export default ProfileMap;
