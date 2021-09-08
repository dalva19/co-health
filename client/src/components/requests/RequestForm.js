import { useState } from "react";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";

const RequestForm = (props) => {
  //state
  const [text, setText] = useState("");

  //helper functions
  const handleSubmitButton = (e) => {
    e.preventDefault();
    //dispatch request action
  };

  return (
    <>
      <RequestFormContainer>
        <Modal onHide={props.handleClose} animation={false} show={props.show}>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Request</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicStateAddress">
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
      </RequestFormContainer>
    </>
  );
};

const RequestFormContainer = styled.div`
  padding-top: 5vh;
`;

export default RequestForm;
