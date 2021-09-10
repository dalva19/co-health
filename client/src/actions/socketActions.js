//variables
export const SET_SOCKET = "set_socket";

//action creators
export const setSocket = (socket) => (dispatch) => {
  dispatch({
    type: SET_SOCKET,
    payload: socket,
  });
};
