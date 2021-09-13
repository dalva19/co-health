import {
  DELETE_OFFER,
  EDIT_OFFER,
  FETCH_OFFER,
  FETCH_OFFERS,
  POST_OFFER,
} from "../actions/offerActions";

const DEFAULT_STATE = {
  offers: [null],
};

const offerReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case FETCH_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case FETCH_OFFER:
      return {
        ...state,
        offer: action.payload,
      };
    case POST_OFFER:
      const newOffer = action.payload.offer;
      return {
        ...state,
        offers: [newOffer, ...state.offers],
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
      };
    case DELETE_OFFER:
      const deletedOffer = action.payload.deletedOfferId;
      const newOffersState = state.offers.filter(
        (offer) => offer._id !== deletedOffer
      );
      return {
        ...state,
        requests: newOffersState,
      };
    default:
      return state;
  }
};

export default offerReducer;
