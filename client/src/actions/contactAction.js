import axios from "axios";
//variables
export const FETCH_CONTACT = "fetch_contact";

//action creators
export const getContact = (id) => (dispatch) => {
  //body will have connectId
  axios
    .get(`/co-health/api/profile/${id}`)
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
