import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../actions/coordinatesAction";

const Register = () => {
  const dispatch = useDispatch();
  const { coordinates, loaded } = useSelector((state) => state.coordinates);

  //state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [street, setStreet] = useState("114 chestnut ct ");
  const [city, setCity] = useState("jacksonville");
  const [state, setState] = useState("nc");
  const [zip, setZip] = useState("28546");
  const [address, setAddress] = useState("");
  const [healthcareMember, setHealthcareMember] = useState(false);
  const [communityMember, setCommunityMember] = useState(false);

  //helper functions
  const splitStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  const handleSubmitButton = () => {
    splitStreetName();
  };

  useEffect(() => {
    if (address) {
      dispatch(loadCoordinatesFromAddress(address));
    }

    if (loaded) {
      let profileType;
      if (healthcareMember) {
        profileType = "healthcare member";
      }

      if (communityMember) {
        profileType = "community member";
      }

      const body = {
        name: {
          firstName: firstName,
          lastName: lastName,
        },
        address: {
          street: street,
          city: city,
          state: state,
          zipcode: zip,
        },
        coordinates: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        profileType: profileType,
      };
    }
  }, [address, dispatch, loaded]);

  return (
    <>
      <h1>Register Account</h1>
      <form>
        <label>First Name</label>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          vaule={firstName}
        />
        <label>Last Name</label>
        <input onChange={(e) => setLastName(e.target.value)} vaule={lastName} />
        <label>Username</label>
        <input onChange={(e) => setUsername(e.target.value)} vaule={username} />
        <label>Password</label>
        <input onChange={(e) => setPassword(e.target.value)} vaule={password} />
        <label>Street</label>
        <input onChange={(e) => setStreet(e.target.value)} vaule={street} />
        <label>City</label>
        <input onChange={(e) => setCity(e.target.value)} vaule={city} />
        <label>State</label>
        <input onChange={(e) => setState(e.target.value)} vaule={state} />
        <label>Zipcode</label>
        <input onChange={(e) => setZip(e.target.value)} vaule={zip} />
      </form>

      <button onClick={handleSubmitButton}>submit</button>
    </>
  );
};

const RegisterContainer = styled.div`
  padding-top: 10vh;
`;

export default Register;
