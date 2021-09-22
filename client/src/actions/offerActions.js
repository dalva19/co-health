import axios from "axios";
//variables
export const FETCH_OFFERS = "fetch_offers";
export const FETCH_OFFER = "fetch_offer";
export const POST_OFFER = "post_offer";
export const EDIT_OFFER = "edit_offer";
export const DELETE_OFFER = "delete_offer";
export const OFFERS_LOADING = "offers_loading";

//action creators
export const getOffers = (page) => (dispatch) => {
  axios
    .get(`/co-health/api/profile/offers?page=${page}`, {
      withCredentials: true,
    })
    .then((response) => {
      dispatch({
        type: FETCH_OFFERS,
        payload: response,
      });
    })
    .catch((error) => {
      return error;
    });
};

//backend route needs to be written
export const getOffer = (id) => (dispatch) => {
  axios
    .get(`/co-health/api/profile/offers/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_OFFER,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const postOffer = (requestId, body) => (dispatch) => {
  axios
    .post(`/co-health/api/profile/offers/${requestId}`, body)
    .then((response) => {
      dispatch({
        type: POST_OFFER,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const editOffer = (offerId, body) => (dispatch) => {
  axios
    .put(`/co-health/api/profile/offers/edit/${offerId}`, body)
    .then((response) => {
      dispatch({
        type: EDIT_OFFER,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const deleteOffer = (offerId) => (dispatch) => {
  axios
    .delete(`/co-health/api/profile/offers/${offerId}`)
    .then((response) => {
      dispatch({
        type: DELETE_OFFER,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const offersLoading = () => (dispatch) => {
  dispatch({
    type: OFFERS_LOADING,
  });
};
