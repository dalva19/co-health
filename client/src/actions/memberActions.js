import axios from "axios";

//variables
export const FETCH_MEMBER = "fetch_member";
export const LOGOUT_MEMBER = "logout_member";

//action creators
export const login = (body) => (dispatch) => {
  // const ROOT_URL = `http://localhost:8000`;
  axios
    .post(`/co-health/api/user/login`, body, { withCredentials: true })
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

//not working how i want it to
//redux empties with refresh??
export const getMemberProfile = () => (dispatch) => {
  // const ROOT_URL = `http://localhost:8000`;
  axios
    .get(`/co-health/api/profile/`, { withCredentials: true })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: FETCH_MEMBER,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      return error;
    });
};

export const logout = () => (dispatch) => {
  // const ROOT_URL = `http://localhost:8000`;
  axios
    .get(`/co-health/api/user/logout`)
    .then((response) => {
      dispatch({
        type: LOGOUT_MEMBER,
      });
    })
    .catch((error) => {
      return error;
    });
};
