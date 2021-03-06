import axios from "axios";

//variables
export const FETCH_COORDINATES = "fetch_coordinates";
export const RESET_COORDINATES = "reset_coordinates";

//action creators
export const loadCoordinatesFromAddress = (address) => (dispatch) => {
  const ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=`;

  axios
    .get(
      `${ROOT_URL}${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
    )
    .then(function (response) {
      dispatch({
        type: FETCH_COORDINATES,
        payload: response.data.results[0].geometry.location,
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  dispatch({
    type: FETCH_COORDINATES,
  });
};

export const resetCoordinates = () => (dispatch) => {
  dispatch({
    type: RESET_COORDINATES,
  });
};
