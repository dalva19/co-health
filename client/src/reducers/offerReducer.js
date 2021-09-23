import {
  DELETE_OFFER,
  EDIT_OFFER,
  FETCH_OFFER,
  FETCH_OFFERS,
  POST_OFFER,
  OFFERS_LOADING,
} from "../actions/offerActions";

const DEFAULT_STATE = {
  offers: [],
  count: [],
  isLoading: true,
};

const offerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case OFFERS_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_OFFERS:
      return {
        ...state,
        offers: action.payload.data.offers,
        count: action.payload.data.count,
        isLoading: false,
      };
    case FETCH_OFFER:
      return {
        ...state,
        offer: action.payload,
        isLoading: false,
      };
    case POST_OFFER:
      const newOffer = action.payload.offer;
      return {
        ...state,
        offers: [newOffer, ...state.offers],
        isLoading: false,
      };
    case EDIT_OFFER:
      const updatedOffer = action.payload;
      const newOffers = state.offers.map((offer) => {
        if (offer._id === updatedOffer._id) {
          return updatedOffer;
        } else {
          return offer;
        }
      });
      return {
        ...state,
        offers: newOffers,
        isLoading: false,
      };
    case DELETE_OFFER:
      const deletedOffer = action.payload.deletedOfferId;
      const newOffersState = state.offers.filter(
        (offer) => offer._id !== deletedOffer
      );
      const count = state.count;
      return {
        ...state,
        offers: newOffersState,
        count: [count - 1],
      };
    default:
      return state;
  }
};

export default offerReducer;
