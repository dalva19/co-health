import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadCoordinatesFromAddress } from "../actions/coordinatesAction";

const Map = () => {
  const dispatch = useDispatch();
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");

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
    <div>
      <h1>this is where the map will be</h1>
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
    </div>
  );
};

export default Map;
