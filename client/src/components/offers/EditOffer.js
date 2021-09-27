import { useState } from "react";
import { useDispatch } from "react-redux";
import { editOffer } from "../../actions/offerActions";
//style
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const EditOffer = (props) => {
  //state
  const [editText, setEditText] = useState(props.offer.text);

  const dispatch = useDispatch();

  //helper functions
  //FORM VALIDATION FOR EMPTY FIELDS
  const handleSubmitButton = (e) => {
    e.preventDefault();
    const offerId = props.offer._id;
    const body = { text: editText };
    dispatch(editOffer(offerId, body));
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
          <Form>
            <Form.Group className="mb-3" controlId="formBasicStateAddress">
              {/* <Form.Label>Text</Form.Label> */}
              <Form.Control
                as="textarea"
                placeholder="Text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            </Form.Group>
            <StyledButton>
              <Button
                className="button"
                // variant="outline-dark"
                type="submit"
                onClick={handleSubmitButton}
              >
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
