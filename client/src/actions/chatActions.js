import axios from "axios";
//variables
export const FETCH_CHAT = "fetch_chat";

//action creators
export const getChat = (body) => (dispatch) => {
  //body will have connectId
  axios
    .get(`/co-health/api/chat`, body)
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
