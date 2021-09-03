import axios from "axios";

//variables
export const SET_REGISTER_STATUS = "set_register_status";

//action creators
export const registerUser = (body) => (dispatch) => {
  // const ROOT_URL = `http://localhost:8000`;

  axios
    .post(`/co-health/api/user/register`, body)
    .then(() => {
      dispatch({
        type: SET_REGISTER_STATUS,
      });
    })
    .catch((error) => {
      return error;
    });
};
