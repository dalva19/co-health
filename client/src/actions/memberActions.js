import axios from "axios";
//variables
export const FETCH_MEMBER = "fetch_member";
export const LOGOUT_MEMBER = "logout_member";
export const UPDATE_SETTINGS = "update_settings";
export const ADD_LICENSE = "add_license";

//action creators
export const login = (body) => (dispatch) => {
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

export const getMemberProfile = () => (dispatch) => {
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

export const updateProfileSettings = (body) => (dispatch) => {
  axios
    .put(`/co-health/api/profile/settings/info`, body, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: UPDATE_SETTINGS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      return error;
    });
};

export const updateProfileLicense = (body) => (dispatch) => {
  axios
    .put(`/co-health/api/profile/settings/license`, body, {
      withCredentials: true,
    })
    .then((response) => {
      if (response.data) {
        dispatch({
          type: UPDATE_SETTINGS,
          payload: response.data,
        });
      }
    })
    .catch((error) => {
      return error;
    });
};
