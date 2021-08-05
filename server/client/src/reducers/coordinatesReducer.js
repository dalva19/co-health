import { FETCH_COORDINATES } from "../actions/coordinatesAction";

const DEFAULT_STATE = {
  coordinates: {},
  loaded: false,
};

const coordinatesReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_COORDINATES:
      return {
        ...state,
        coordinates: action.payload,
        loaded: true,
      };
    default:
      return state;
  }
};

export default coordinatesReducer;
