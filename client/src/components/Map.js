import { useState, useEffect } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";

const Map = () => {
  const [selectedData, setSelectedData] = useState(null);

  const markerDummyData = [
    {
      username: "user1",
      request: "i need help getting my prescription",
      coordinates: { lat: 35.9132, lng: -79.0558 },
    },
    {
      username: "user2",
      request: "i need help getting to my appt",
      coordinates: { lat: 35.7915, lng: -78.7811 },
    },
  ];

  return (
    <div>
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 35.994, lng: -78.8986 }}
      >
        {markerDummyData.map((data) => (
          <Marker
            key={markerDummyData.indexOf(data)}
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
            <div>
              <h2>{selectedData.username}</h2>
              <p>{selectedData.request}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default Map;
