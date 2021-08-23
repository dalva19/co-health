import axios from "axios";

//variables
export const SET_REGISTER_STATUS = "set_register_status";

//action creators
export const registerUser = (body) => (dispatch) => {
  const ROOT_URL = `http://localhost:8000`;

  axios
    .post(`${ROOT_URL}/co-health/user/register`, body)
    .then((response) => {
      dispatch({
        type: SET_REGISTER_STATUS,
        payload: response,
      });
    })
    .catch((error) => {
      return error;
    });
};
