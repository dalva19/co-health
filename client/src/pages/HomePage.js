import { useEffect } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import Home from "../components/Home";
import ServicesSection from "../components/ServicesSection";
//components
import HomeMap from "../components/HomeMap";

const HomePage = () => {
  const WrappedMap = withScriptjs(withGoogleMap(HomeMap));

  return (
    <>
      <Home />
      <ServicesSection />

      {/* <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div> */}
    </>
  );
};

export default HomePage;
