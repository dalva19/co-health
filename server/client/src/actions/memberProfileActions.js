import axios from "axios";

//variables
export const REGISTER_MEMBER = "register_member";

//action creators
export const registerMember = (body) => (dispatch) => {
  const ROOT_URL = `http://localhost:8000`;
  console.log(body);

  axios
    .post(`${ROOT_URL}/co-health/user/register`, body)
    .then((response) => {
      dispatch({
        type: REGISTER_MEMBER,
        payload: response,
      });
    })
    .catch((error) => {
      return error;
    });

  // axios
  //   .get(
  //     `${ROOT_URL}${address}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`
  //   )
  //   .then(function (response) {
  //     dispatch({
  //       type: FETCH_COORDINATES,
  //       payload: response.data.results[0].geometry.location,
  //     });
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });

  dispatch({
    type: REGISTER_MEMBER,
  });
};

// export const setHomeCoordinatesToDB = (lat, lng) => (dispatch) => {
//   const ROOT_URL = `https://localhost:3000`;

// };
