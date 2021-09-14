import { useState } from "react";
import { useDispatch } from "react-redux";
import { postOffer } from "../../actions/offerActions";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";

const OfferForm = (props) => {
  //state
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  //helper functions
  const handleSubmitButton = (e) => {
    e.preventDefault();

    const body = { text: text };
    dispatch(postOffer(props.requestId, body));
  };

  return (
    <>
      <OfferFormContainer>
        <Modal onHide={props.handleClose} animation={false} show={props.show}>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Offer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicStateText">
                <Form.Label>Text</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
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
      </OfferFormContainer>
    </>
  );
};

const OfferFormContainer = styled.div`
  padding-top: 5vh;
`;

export default OfferForm;
