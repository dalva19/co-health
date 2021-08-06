import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { loadCoordinatesFromAddress } from "../actions/coordinatesAction";

const Register = () => {
  const dispatch = useDispatch();

  //state
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

  //helper functions
  const splitStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  const handleGetCoordinatesButton = async () => {
    splitStreetName();
  };

  useEffect(() => {
    if (address) {
      dispatch(loadCoordinatesFromAddress(address));
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

      <button onClick={handleGetCoordinatesButton}>get coordinates</button>
    </>
  );
};

const RegisterContainer = styled.div`
  padding-top: 10vh;
`;

export default Register;
