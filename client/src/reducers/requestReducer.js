import {
  DELETE_REQUEST,
  EDIT_REQUEST,
  EDIT_REQUEST_OFFER_STATUS,
  FETCH_REQUEST,
  FETCH_REQUESTS,
  POST_REQUEST,
  LOADED_FALSE,
} from "../actions/requestActions";

const DEFAULT_STATE = {
  requests: [null],
  loaded: false,
};

const requestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      return {
        ...state,
        requests: action.payload,
        loaded: true,
      };
    case LOADED_FALSE:
      return {
        ...state,
        loaded: false,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        request: action.payload,
      };
    case POST_REQUEST:
      const newRequest = action.payload.newRequest;
      return {
        ...state,
        requests: [newRequest, ...state.requests],
      };
    case EDIT_REQUEST:
      const updatedRequest = action.payload.request;
      const newRequests = state.requests.map((request) => {
        if (request._id === updatedRequest._id) {
          return updatedRequest;
        } else {
          return request;
        }
      });
      return {
        ...state,
        requests: newRequests,
      };
    case EDIT_REQUEST_OFFER_STATUS:
      const requestEdit = action.payload.request;
      const newRequestsList = state.requests.map((request) => {
        if (request._id === requestEdit._id) {
          return requestEdit;
        } else {
          return request;
        }
      });
      return {
        ...state,
        requests: newRequestsList,
      };
    case DELETE_REQUEST:
      const deletedRequest = action.payload.deletedRequestId;
      const newRequestsState = state.requests.filter(
        (request) => request._id !== deletedRequest
      );
      return {
        ...state,
        requests: newRequestsState,
      };
    default:
      return state;
  }
};

export default requestReducer;
