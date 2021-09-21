import axios from "axios";
//variables
export const FETCH_CHAT = "fetch_chat";
export const RESET_CHAT = "reset_chat";
export const CREATE_CHAT = "create_chat";

//action creators
export const getChat = (body) => (dispatch) => {
  axios
    .get(
      `/co-health/api/chat?communityMember=${body.communityMember}&healthcareMember=${body.healthcareMember}`
    )
    .then((response) => {
      dispatch({
        type: FETCH_CHAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const getChatById = (chatId) => (dispatch) => {
  axios
    .get(`/co-health/api/chat/${chatId}`)
    .then((response) => {
      dispatch({
        type: FETCH_CHAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};

export const resetChat = () => (dispatch) => {
  dispatch({ type: RESET_CHAT });
};

export const createChat = (offerId) => (dispatch) => {
  const body = {
    offerId: offerId,
  };
  axios
    .post(`/co-health/api/chat/contacts/`, body)
    .then((response) => {
      dispatch({
        type: CREATE_CHAT,
        payload: response.data,
      });
    })
    .catch((error) => {
      return error;
    });
};
