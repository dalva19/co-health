import axios from "axios";
//variables
export const FETCH_CHAT = "fetch_chat";
export const SET_LOADING = "set_loading";

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
