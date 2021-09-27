import axios from "axios";
//variables
export const FETCH_COMMUNITY_REQUESTS = "fetch_community_requests";
export const RESET_COMMUNITY_REQUESTS = "reset_community_requests";

//action creators
export const getCommunityRequests = () => (dispatch) => {
  axios
    .get(`/co-health/api/requests`)
    .then((response) => {
      dispatch({
        type: FETCH_COMMUNITY_REQUESTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const searchCommunityRequests = (communityName) => (dispatch) => {
  axios
    .get(`/co-health/api/requests/${communityName}`)
    .then((response) => {
      dispatch({
        type: FETCH_COMMUNITY_REQUESTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const resetCommunityRequests = () => (dispatch) => {
  dispatch({
    type: RESET_COMMUNITY_REQUESTS,
  });
};
