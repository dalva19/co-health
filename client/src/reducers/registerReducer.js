import { SET_REGISTER_STATUS } from "../actions/registerActions";

const DEFAULT_STATE = {
  registered: false,
};

const registerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_REGISTER_STATUS:
      return {
        registered: true,
      };
    default:
      return state;
  }
};

export default registerReducer;
