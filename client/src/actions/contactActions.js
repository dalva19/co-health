import axios from "axios";
//variables
export const FETCH_CONTACT = "fetch_contact";
export const RESET_CONTACT = "reset_contact";

//action creators
export const getContact = (id) => (dispatch) => {
  axios
    .get(`/co-health/api/profile/user/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_CONTACT,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const resetContact = () => (dispatch) => {
  dispatch({
    type: RESET_CONTACT,
  });
};
