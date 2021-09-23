import { useState } from "react";
import { useDispatch } from "react-redux";
import { editOffer } from "../../actions/offerActions";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";

const EditOffer = (props) => {
  //state
  const [editText, setEditText] = useState(props.offer.text);

  const dispatch = useDispatch();

  //helper functions
  const handleSubmitButton = (e) => {
    e.preventDefault();
    const offerId = props.offer._id;
    const body = { text: editText };
    dispatch(editOffer(offerId, body));
  };

  return (
    <>
      <OfferFormContainer>
        <Modal onHide={props.handleClose} animation={false} show={props.show}>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Edit Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicStateAddress">
                {/* <Form.Label>Text</Form.Label> */}
                <Form.Control
                  type="text"
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
          <Modal.Footer></Modal.Footer>
        </Modal>
      </OfferFormContainer>
    </>
  );
};

const OfferFormContainer = styled.div`
  padding-top: 5vh;
  #button {
    background-color: #ab417f;
    border: none;
  }
`;

const StyledButton = styled.div`
  .button {
    background-color: #ab417f;
    border: none;
  }
`;

export default EditOffer;
