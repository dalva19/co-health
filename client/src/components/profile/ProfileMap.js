import { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";
import { useSelector } from "react-redux";
import styled from "styled-components";

const ProfileMap = () => {
  const [selectedData, setSelectedData] = useState(null);
  const { requests } = useSelector((state) => state.communityRequests);
  const { coordinates } = useSelector((state) => state.member.member[0]);

  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: coordinates.lat, lng: coordinates.lng }}
      >
        {requests.map((data) => (
          <Marker
            key={requests.indexOf(data)}
            position={{ lat: data.coordinates.lat, lng: data.coordinates.lng }}
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
              <h2>{selectedData.username}</h2>
              <p>{selectedData.text}</p>
              <p className="offer-link">Make an offer</p>
            </StyledInfo>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

const StyledInfo = styled.div`
  .offer-link {
    cursor: pointer;
  }
`;

export default ProfileMap;
