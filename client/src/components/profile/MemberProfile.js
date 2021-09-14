import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getChat } from "../../actions/chatActions";
//components
import HealthCareProfile from "./HealthcareProfile";
import CommunityProfile from "./CommunityProfile";
import styled from "styled-components";

const dummyData = [
  {
    healthcareMember: {
      _id: "6132b468fad052ba8ee058cc",
      username: "nurse1",
      profileType: "healthcare member",
      name: {},
      avatar: null,
      address: {
        zipcode: "NaN",
      },
      credentials: {
        liscence: null,
        liscenceNumber: null,
        verified: true,
      },
      requests: [],
      offers: [
        {
          _id: "613632aab851e10378af64b9",
          text: "i can help",
          username: "nurse1",
          user: "6132b468fad052ba8ee058cc",
          request: "61363152b851e10378af64a7",
          status: "offer accepted",
          date: "2021-09-06T15:24:26.021Z",
          __v: 0,
        },
      ],
    },
    commMember: {
      _id: "613630c2b851e10378af64a0",
      username: "comm1",
      profileType: "community member",
      name: {},
      avatar: null,
      address: {
        zipcode: "NaN",
      },
      credentials: {
        liscence: null,
        liscenceNumber: null,
        verified: true,
      },
      requests: [
        {
          _id: "61363152b851e10378af64a7",
          text: "this is a request",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: ["613632aab851e10378af64b9"],
          status: "offer accepted",
          date: "2021-09-06T15:18:42.962Z",
          __v: 1,
          acceptedOffer: "613632aab851e10378af64b9",
        },
        {
          _id: "613647bf610efbb31df0b258",
          text: "changing the text",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: [],
          status: "awaiting offer",
          date: "2021-09-06T16:54:23.253Z",
          __v: 0,
        },
        {
          _id: "613648f28ac96f992eba0704",
          text: "i need some help with my meds",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: [],
          status: "awaiting offer",
          date: "2021-09-06T16:59:30.844Z",
          __v: 0,
        },
        {
          _id: "6136492d10a648e8afbe8044",
          text: "i need some help with my meds and dinner",
          username: "comm1",
          user: "613630c2b851e10378af64a0",
          offers: [],
          status: "awaiting offer",
          date: "2021-09-06T17:00:29.434Z",
          __v: 0,
        },
      ],
      offers: [],
    },
    request: {
      _id: "61363152b851e10378af64a7",
      text: "this is a request",
      username: "comm1",
      user: "613630c2b851e10378af64a0",
      offers: [
        {
          _id: "613632aab851e10378af64b9",
          text: "i can help",
          username: "nurse1",
          user: "6132b468fad052ba8ee058cc",
          request: "61363152b851e10378af64a7",
          status: "offer accepted",
          date: "2021-09-06T15:24:26.021Z",
          __v: 0,
        },
      ],
      status: "offer accepted",
      date: "2021-09-06T15:18:42.962Z",
      __v: 1,
      acceptedOffer: "613632aab851e10378af64b9",
    },
    offers: {
      _id: "613632aab851e10378af64b9",
      text: "i can help",
      username: "nurse1",
      user: "6132b468fad052ba8ee058cc",
      request: "61363152b851e10378af64a7",
      status: "offer accepted",
      date: "2021-09-06T15:24:26.021Z",
      __v: 0,
    },
  },
];

const dummyContacts = [
  {
    _id: "6132b468fad052ba8ee058cc",
  },
];

const MemberProfile = () => {
  const dispatch = useDispatch();
  const { member } = useSelector((state) => state.member);

  //loads with profile info based on who is logged in
  return (
    <>
      <MemberProfileContainer>
        {member[0].profileType === "healthcare member" ? (
          <HealthCareProfile />
        ) : (
          ""
        )}
        {member[0].profileType === "community member" ? (
          <CommunityProfile />
        ) : (
          ""
        )}
      </MemberProfileContainer>
    </>
  );
};

const MemberProfileContainer = styled.div`
  /* padding-top: 1rem; */
`;

export default MemberProfile;
