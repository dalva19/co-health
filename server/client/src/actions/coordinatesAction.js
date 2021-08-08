import axios from "axios";

//variables
export const FETCH_COORDINATES = "fetch_coordinates";
export const SET_COORDINATES = "set_coordinates";

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
};

// export const setHomeCoordinatesToDB = (lat, lng) => (dispatch) => {
//   const ROOT_URL = `https://localhost:3000`;

// };
