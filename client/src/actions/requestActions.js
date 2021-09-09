import axios from "axios";
//variables
export const FETCH_REQUESTS = "fetch_requests";
export const FETCH_REQUEST = "fetch_request";
export const POST_REQUEST = "post_request";
export const EDIT_REQUEST = "edit_request";
export const EDIT_REQUEST_OFFER_STATUS = "edit_request_offer_status";
export const DELETE_REQUEST = "delete_request";
export const LOADED_FALSE = "loaded_false";

//action creators
export const getRequests = () => (dispatch) => {
  axios
    .get(`/co-health/api/profile/requests`, { withCredentials: true })
    .then((response) => {
      dispatch({
        type: FETCH_REQUESTS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const getRequest = (requestId) => (dispatch) => {
  axios
    .get(`/co-health/api/profile/requests/${requestId}`)
    .then((response) => {
      dispatch({
        type: FETCH_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const postRequest = (body) => (dispatch) => {
  axios
    .post(`/co-health/api/profile/requests`, body)
    .then((response) => {
      dispatch({
        type: POST_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const editRequest = (requestId) => (dispatch) => {
  axios
    .put(`/co-health/api/profile/requests/edit/${requestId}`)
    .then((response) => {
      dispatch({
        type: EDIT_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const editRequestOfferStatus = (offerId) => (dispatch) => {
  axios
    .put(`/co-health/api/profile/requests/edit/offer/status/${offerId}`)
    .then((response) => {
      dispatch({
        type: EDIT_REQUEST_OFFER_STATUS,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const deleteRequest = (requestId) => (dispatch) => {
  axios
    .delete(`/co-health/api/profile/requests/${requestId}`)
    .then((response) => {
      dispatch({
        type: DELETE_REQUEST,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
