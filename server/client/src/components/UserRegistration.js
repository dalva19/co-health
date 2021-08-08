import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../actions/coordinatesAction";

const Register = () => {
  const dispatch = useDispatch();
  const { coordinates } = useSelector((state) => state.coordinates);

  //state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("114 chestnut ct ");
  const [city, setCity] = useState("jacksonville");
  const [state, setState] = useState("nc");
  const [zip, setZip] = useState("28546");
  const [address, setAddress] = useState("");

  //helper functions
  const splitStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  const handleGetCoordinatesButton = () => {
    splitStreetName();
  };

  const makeReq = async () => {
    try {
      const userCoordinates = await coordinates;
      return userCoordinates;
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (address) {
      dispatch(loadCoordinatesFromAddress(address));
      const userCoordinates = makeReq();

      // const req = {
      //   address: {
      //     street: street,
      //     city: city,
      //     state: state,
      //     zipcode: zip,
      //   },
      //   coordinates: {
      //     lat: coordinates.lat,
      //     lng: coordinates.lng,
      //   },
      // };
      console.log(userCoordinates);
    }
  }, [address, dispatch]);

  return (
    <>
      <h1>Register Account</h1>
      <form>
        <label>Username</label>
        <input />
        <label>Password</label>
        <input />
        <label>Street</label>
        <input onChange={(e) => setStreet(e.target.value)} vaule={street} />
        <label>City</label>
        <input onChange={(e) => setCity(e.target.value)} vaule={city} />
        <label>State</label>
        <input onChange={(e) => setState(e.target.value)} vaule={state} />
        <label>Zipcode</label>
        <input onChange={(e) => setZip(e.target.value)} vaule={zip} />
      </form>

      <button onClick={handleGetCoordinatesButton}>submit</button>
    </>
  );
};

const RegisterContainer = styled.div`
  padding-top: 10vh;
`;

export default Register;
