import React from "react";
//components
import Nav from "./Nav";
import styled from "styled-components";

const MemberProfile = () => {
  //loads with profile info based on who is logged in
  return (
    <>
      <Nav />
      <MemberProfileContainer>
        <h2>Requests/Offers</h2>
        <p>Request items/Offer items</p>
        <h2>MAP and connections</h2>
      </MemberProfileContainer>
    </>
  );
};

const MemberProfileContainer = styled.div`
  padding-top: 10vh;
`;

export default MemberProfile;
