import { useState } from "react";
import { useDispatch } from "react-redux";
import { editOffer } from "../../actions/offerActions";
import { validFields } from "../../utilities/utilities";
//style
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const EditOffer = (props) => {
  //state
  const [editText, setEditText] = useState(props.offer.text);
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();

  //helper functions
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validFields({ editText }, setErrors)) {
      const offerId = props.offer._id;
      const body = { text: editText };
      dispatch(editOffer(offerId, body));
      setEditText("");
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <Modal onHide={props.handleClose} show={props.show}>
        <StyledHeader>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Edit Offer</Modal.Title>
          </Modal.Header>
        </StyledHeader>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicStateAddress">
              <Form.Control
                as="textarea"
                placeholder="Text"
                value={editText}
                required
                onChange={(e) => setEditText(e.target.value)}
              />
            </Form.Group>
            <StyledButton>
              <Button className="button" type="submit">
                Save changes
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

export default EditOffer;
