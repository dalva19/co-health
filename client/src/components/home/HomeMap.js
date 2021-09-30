import { useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "react-google-maps";

const HomeMap = () => {
  const [selectedData, setSelectedData] = useState(null);

  const markerDummyData = [
    {
      username: "johnnyB",
      request: ["i need help getting my prescription"],
      coordinates: { lat: 35.9132, lng: -79.0558 },
    },
    {
      username: "dfj22",
      request: ["i need help with a wound dressing change on my foot."],
      coordinates: { lat: 35.7915, lng: -78.7811 },
    },
    {
      username: "plantGirl",
      request: ["i need somone to sit with me for my chemo appointment"],
      coordinates: { lat: 35.8915, lng: -78.8811 },
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
            <>
              <h2>{selectedData.username}</h2>
              <p>{selectedData.request[0]}</p>
            </>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default HomeMap;
