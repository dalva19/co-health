import { FETCH_LICENSE } from "../actions/licenseActions";

const DEFAULT_STATE = {
  license: [null],
  loaded: false,
};

const licenseReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_LICENSE:
      return {
        ...state,
        license: action.payload,
        loaded: true,
      };
    default:
      return state;
  }
};

export default licenseReducer;
