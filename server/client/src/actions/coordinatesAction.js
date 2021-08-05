import axios from "axios";

//variables
export const FETCH_COORDINATES = "FETCH_COORDINATES";

//action creators
export const loadCoordinatesFromAddress =
  (streetNumber, streetName, city, zipcode) => (dispatch) => {
    const ROOT_URL = `https://maps.googleapis.com/maps/api/geocode/json?address=`;

    axios
      .get(
        `${ROOT_URL}${streetNumber}+${streetName}+${city}+${zipcode}&key=${process.env.GOOGLE_MAPS_GEOCODING_API_KEY}`
      )
      .then(function (response) {
        dispatch({ type: FETCH_COORDINATES, payload: response.results });
      })
      .catch(function (error) {
        console.log(error);
      });
  };
