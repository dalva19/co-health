import { useState, useEffect } from "react";
import Avatar from "./Avatar";
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  loadCoordinatesFromAddress,
  resetCoordinates,
} from "../../actions/coordinatesAction";
import { updateProfileSettings } from "../../actions/memberActions";
import { validFields } from "../../utilities/utilities";
//style
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const SettingsForm = (props) => {
  const dispatch = useDispatch();
  const coordinates = useSelector((state) => state.coordinates.coordinates);
  const member = useSelector((state) => state.member.member[0]);

  //state
  const [firstName, setFirstName] = useState(
    member.name ? member.name.firstName : ""
  );
  const [lastName, setLastName] = useState(
    member.name ? member.name.lastName : ""
  );

  const [bio, setBio] = useState(member.bio ? member.bio : "");
  const [avatar, setAvatar] = useState(member.avatar ? member.avatar : "");
  const [street, setStreet] = useState(
    member.address.street ? member.address.street : ""
  );
  const [city, setCity] = useState(
    member.address.city ? member.address.city : ""
  );
  const [state, setState] = useState(
    member.address.state ? member.address.state : ""
  );
  const [zip, setZip] = useState(
    member.address.zipcode ? member.address.zipcode : ""
  );

  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState("");

  //helper functions
  const transformStreetName = () => {
    const address = `${street} ${city} ${state} ${zip}`;
    const addressSplit = address.split(" ");
    const addressJoin = addressSplit.join("+,");
    setAddress(addressJoin);
  };

  useEffect(() => {
    if (address) {
      dispatch(loadCoordinatesFromAddress(address));
    }
  }, [dispatch, address]);

  useEffect(() => {
    if (coordinates) {
      const body = {
        firstName: firstName,
        lastName: lastName,
        avatar: avatar[0] ? avatar[0].data_url : "",
        bio: bio,
        street: street,
        city: city,
        state: state,
        zipcode: zip,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      dispatch(updateProfileSettings(body));
      dispatch(resetCoordinates());
    }
  }, [
    coordinates,
    dispatch,
    bio,
    street,
    city,
    state,
    zip,
    firstName,
    lastName,
    avatar,
  ]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validFields({ street, city, state, zip }, setErrors)) {
      transformStreetName();
    }
  };

  return (
    <>
      <Modal onHide={props.handleClose} show={props.show}>
        <StyledHeader>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Manage Personal Information</Modal.Title>
          </Modal.Header>
        </StyledHeader>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Label>Profile Pic</Form.Label>
            <StyledProfilePic>
              <div className="avatar-container">
                {member.avatar ? (
                  <img className="user-pic" src={member.avatar} alt="Pic" />
                ) : (
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="icon fa-3x user"
                  />
                )}
              </div>
            </StyledProfilePic>
            <Avatar setAvatar={setAvatar} avatar={avatar} />
            <br />

            <Form.Group className="mb-3" controlId="formBasicFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicLastName">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStreetAddress">
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Street"
                value={street}
                required
                onChange={(e) => setStreet(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicCityAddress">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="City"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStateAddress">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="State"
                value={state}
                required
                onChange={(e) => setState(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicZipAddress">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                placeholder="Zip Code"
                value={zip}
                required
                onChange={(e) => setZip(e.target.value)}
              />
            </Form.Group>
            <StyledButton>
              <Button className="button" type="submit">
                Submit
              </Button>
            </StyledButton>
          </Form>
        </Modal.Body>
        <StyledFooter>
          <Modal.Footer></Modal.Footer>
        </StyledFooter>
      </Modal>
    </>
  );
};

const StyledProfilePic = styled.div`
  .avatar-container {
    height: 7vh;
    width: 7vh;
    margin-bottom: 0.5rem;
  }
  .user-pic {
    height: 100%;
    width: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
  .user {
    color: #ab417f;
  }
`;

export default SettingsForm;
