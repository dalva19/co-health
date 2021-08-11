import { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { loadCoordinatesFromAddress } from "../actions/coordinatesAction";
import { registerStatus } from "../actions/memberProfileActions";
import { Redirect, Route } from "react-router-dom";

const UserRegistration = () => {
  const dispatch = useDispatch();

  const { registered } = useSelector((state) => state.registration);

  const { coordinates, coordinatesLoaded } = useSelector(
    (state) => state.coordinates
  );

  //state
  const [firstName, setFirstName] = useState("danna");
  const [lastName, setLastName] = useState("alvarado");
  const [email, setEmail] = useState("ssssss@email.com");
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("password");
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

    if (coordinatesLoaded) {
      let profileType;
      if (healthcareMember) {
        profileType = "healthcare member";
      }

      if (communityMember) {
        profileType = "community member";
      }

      const body = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
        email: email,
        street: street,
        city: city,
        state: state,
        lat: coordinates.lat,
        lng: coordinates.lng,
        profileType: profileType,
      };

      dispatch(registerStatus(body));
    }
  }, [address, dispatch, coordinatesLoaded]); //add dependencies to useeffect

  return (
    <>
      <RegisterContainer>
        <h1>Register Account</h1>
        <form>
          <label>First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            vaule={firstName}
          />
          <label>Last Name</label>
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            vaule={lastName}
          />
          <label>Username</label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            vaule={username}
          />
          <label>Password</label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            vaule={password}
          />
          <label>Email</label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            vaule={email}
          />
          <label>Street</label>
          <input
            type="text"
            onChange={(e) => setStreet(e.target.value)}
            vaule={street}
          />
          <label>City</label>
          <input
            type="text"
            onChange={(e) => setCity(e.target.value)}
            vaule={city}
          />
          <label>State</label>
          <input
            type="text"
            onChange={(e) => setState(e.target.value)}
            vaule={state}
          />
          <label>Zipcode</label>
          <input
            type="text"
            onChange={(e) => setZip(e.target.value)}
            vaule={zip}
          />
          <label>Healthcare Member</label>
          <input
            type="checkbox"
            onChange={(e) => setHealthcareMember(!healthcareMember)}
            placeholder="Healthcare Member"
          />
          <label>Community Member</label>
          <input
            type="checkbox"
            onChange={(e) => setCommunityMember(!communityMember)}
          />
        </form>

        <button onClick={handleSubmitButton}>submit</button>
      </RegisterContainer>

      <Route exact path="/co-health/register">
        {registered ? <Redirect to="/co-health/profile" /> : ""}
      </Route>
    </>
  );
};

const RegisterContainer = styled.div`
  padding-top: 10vh;
`;

export default UserRegistration;
