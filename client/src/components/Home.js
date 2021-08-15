import { useEffect } from "react";
import { withScriptjs, withGoogleMap } from "react-google-maps";
import { useSelector, useDispatch } from "react-redux";
import { getMemberProfile } from "../actions/memberActions";
import { Redirect, Route } from "react-router-dom";
//components
import Map from "./Map";
//styling
import styled from "styled-components";
import { Page, Description, Image } from "../styles/styles";
import together from "../img/undraw_Together.svg";

const Home = () => {
  const dispatch = useDispatch();

  const { loaded } = useSelector((state) => state.member);

  //move MAP to profile page
  const WrappedMap = withScriptjs(withGoogleMap(Map));

  // useEffect(() => {
  //   dispatch(getMemberProfile());
  // }, [dispatch]);

  console.log(loaded);
  return (
    <>
      <Page>
        <Description>
          {/* <h1>Welcome to Co-Health</h1> */}
          <TitleContainer>
            <h1>Helping</h1>
            <h1>
              mind the <span>gap</span>
            </h1>
            <h1>in community healthcare.</h1>
          </TitleContainer>
        </Description>
        <Image>
          <img src={together} alt="people" />
        </Image>
      </Page>
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

const TitleContainer = styled.div`
  h1 {
    color: #3a2d49;
    font-size: 4rem;
    font-family: "Inter", sans-serif;
    font-weight: lighter;
  }
  span {
    color: #f18457;
    font-weight: bold;
  }
`;

export default Home;
