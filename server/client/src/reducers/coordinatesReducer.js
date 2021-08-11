import { FETCH_COORDINATES } from "../actions/coordinatesAction";

const DEFAULT_STATE = {
  //hard coding for testing
  //google geolocation working
  coordinates: { lat: 35.994, lng: -78.8986 },
  coordinatesLoaded: false,
};

const coordinatesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_COORDINATES:
      return {
        ...state,
        // coordinates: action.payload,
        coordinatesLoaded: true,
      };
    default:
      return state;
  }
};

export default coordinatesReducer;
