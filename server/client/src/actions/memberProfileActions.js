import axios from "axios";

//variables
export const SET_REGISTER_STATUS = "set_register_status";
export const FETCH_MEMBER = "fetch_member";

//action creators
export const registerStatus = (body) => (dispatch) => {
  const ROOT_URL = `http://localhost:8000`;
  console.log(body);

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

export const login = (body) => (dispatch) => {
  const ROOT_URL = `http://localhost:8000`;
  axios
    .post(`${ROOT_URL}/co-health/user/login`, body, { withCredentials: true })
    .then((response) => {
      dispatch({
        type: FETCH_MEMBER,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const getMemberProfile = () => (dispatch) => {
  const ROOT_URL = `http://localhost:8000`;
  axios
    .get(`${ROOT_URL}/co-health/profile/`, { withCredentials: true })
    .then((response) => {
      dispatch({
        type: FETCH_MEMBER,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
