import React from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
//components
import Map from "./Map";
import styled from "styled-components";

const Home = () => {
  const WrappedMap = withScriptjs(withGoogleMap(Map));
  return (
    <>
      <HomeContainer>
        <h1>Welcome to Co-Health</h1>
        <h3>Helping mind the gap in community healthcare.</h3>
      </HomeContainer>
      <div style={{ width: "100vw", height: "70vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div>
    </>
  );
};

const HomeContainer = styled.div`
  padding-top: 10vh;
`;

export default Home;
