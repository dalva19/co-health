import { REGISTER_MEMBER } from "";

const DEFAULT_STATE = {};

const memberProfileReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case REGISTER_MEMBER:
      return {
        ...state,
        loaded: true,
      };
    default:
      return state;
  }
};

export default memberProfileReducer;
