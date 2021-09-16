import axios from "axios";
//variables
export const FETCH_LICENSE = "fetch_license";
export const VERIFY_LICENSE = "verify_license";

//action creators
export const getLicense = (body) => (dispatch) => {
  axios
    .get(
      `/co-health/api/license?name=${body.name}&licenseType=${body.licenseType}&licenseNumber=${body.licenseNumber}`
    )
    .then((response) => {
      dispatch({
        type: FETCH_LICENSE,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const verifyLicense = (body) => (dispatch) => {
  console.log(body);
  axios
    .put(`/co-health/api/license/verify`, body)
    .then((response) => {
      console.log(response);
      dispatch({
        type: VERIFY_LICENSE,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
