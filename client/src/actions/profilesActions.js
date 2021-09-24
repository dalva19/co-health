import axios from "axios";
//variables
export const FETCH_PROFILE = "fetch_profile";
export const RESET_PROFILE = "reset_profile";

//action creators
export const getProfile = (id) => (dispatch) => {
  //body will have connectId
  axios
    .get(`/co-health/api/profile/user/${id}`)
    .then((response) => {
      dispatch({
        type: FETCH_PROFILE,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const resetProfile = () => (dispatch) => {
  dispatch({
    type: RESET_PROFILE,
  });
};
