import { useState } from "react";
import { useDispatch } from "react-redux";
// import { editOffer } from "../../actions/offerActions";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";

const EditCardForm = (props) => {
  //state
  const [editText, setEditText] = useState(props.offer.text);

  const dispatch = useDispatch();

  //helper functions
  const handleSubmitButton = (e) => {
    e.preventDefault();

    const body = { text: editText };

    if (props.offer) {
      dispatch(props.editOffer(props.offer._id, body));
    } else {
      dispatch(props.editRequest(props.request._id, body));
    }
  };

  return (
    <>
      <RequestFormContainer>
        <Modal onHide={props.handleClose} animation={false} show={props.show}>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>{props.Title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicStateAddress">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
              </Form.Group>

              <Button
                variant="primary"
                type="submit"
                onClick={handleSubmitButton}
              >
                Submit
              </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </Modal>
      </RequestFormContainer>
    </>
  );
};

const RequestFormContainer = styled.div`
  padding-top: 5vh;
`;

export default EditCardForm;
