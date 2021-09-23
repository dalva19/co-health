import { FETCH_LICENSE, LOGOUT_LICENSE } from "../actions/licenseActions";

const DEFAULT_STATE = {
  license: [null],
  isLoading: true,
};

const licenseReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_LICENSE:
      return {
        ...state,
        license: action.payload,
        isLoading: false,
      };
    case LOGOUT_LICENSE:
      return {
        ...state,
        license: [null],
        isLoading: true,
      };
    default:
      return state;
  }
};

export default licenseReducer;
