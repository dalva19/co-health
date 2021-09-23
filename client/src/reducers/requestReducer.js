import {
  DELETE_REQUEST,
  EDIT_REQUEST,
  EDIT_REQUEST_OFFER_STATUS,
  FETCH_REQUEST,
  FETCH_REQUESTS,
  POST_REQUEST,
  REQUEST_LOADING,
  LOGOUT_REQUESTS,
} from "../actions/requestActions";

const DEFAULT_STATE = {
  requests: [],
  count: [],
  isLoading: true,
};

const requestReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_REQUESTS:
      console.log(action.payload.data);
      return {
        ...state,
        requests: action.payload.data.requests,
        count: action.payload.data.count,
        isLoading: false,
      };
    case REQUEST_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case LOGOUT_REQUESTS:
      return {
        ...state,
        requests: [],
        count: [],
        isLoading: true,
      };
    case FETCH_REQUEST:
      return {
        ...state,
        request: action.payload,
        isLoading: false,
      };
    case POST_REQUEST:
      const newRequest = action.payload.newRequest;
      return {
        ...state,
        requests: [newRequest, ...state.requests],
        isLoading: false,
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
        isLoading: false,
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
        isLoading: false,
      };
    case DELETE_REQUEST:
      const deletedRequest = action.payload.deletedRequestId;
      const newRequestsState = state.requests.filter(
        (request) => request._id !== deletedRequest
      );
      const count = state.count;
      return {
        ...state,
        requests: newRequestsState,
        count: [count - 1],
        isLoading: false,
      };
    default:
      return state;
  }
};

export default requestReducer;
