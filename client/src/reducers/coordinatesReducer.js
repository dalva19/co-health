import { FETCH_COORDINATES } from "../actions/coordinatesAction";
import { RESET_COORDINATES } from "../actions/coordinatesAction";

const DEFAULT_STATE = {
  coordinates: null,
  coordinatesLoaded: false,
};

const coordinatesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
        coordinatesLoaded: true,
      };
    case RESET_COORDINATES:
      return DEFAULT_STATE;
    default:
      return state;
  }
};

export default coordinatesReducer;
