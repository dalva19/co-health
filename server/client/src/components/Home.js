import { useEffect } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import { getMemberProfile } from "../actions/memberActions";
import { Redirect, Route } from "react-router-dom";
//components
import Map from "./Map";
import styled from "styled-components";
import MemberProfile from "./MemberProfile";

const Home = () => {
  const dispatch = useDispatch();

  const { loaded } = useSelector((state) => state.member);

  //move MAP to profile page
  const WrappedMap = withScriptjs(withGoogleMap(Map));

  useEffect(() => {
    dispatch(getMemberProfile());
  }, [dispatch]);

  console.log(loaded);
  return (
    <>
      <HomeContainer>
        <h1>Welcome to Co-Health</h1>
        <h3>Helping mind the gap in community healthcare.</h3>
      </HomeContainer>
      {/* <div style={{ width: "100vw", height: "70vh" }}>
        <WrappedMap
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAPS_JAVASCRIPT_API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "100%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
      </div> */}
      <Route exact path="/co-health/">
        {loaded ? <Redirect to="/co-health/profile" /> : ""}
      </Route>
    </>
  );
};

const HomeContainer = styled.div`
  padding-top: 10vh;
`;

export default Home;
