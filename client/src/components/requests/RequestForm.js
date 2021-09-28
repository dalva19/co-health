import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRequest } from "../../actions/requestActions";
//style
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const RequestForm = (props) => {
  //state
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  //helper functions
  const handleSubmitButton = (e) => {
    e.preventDefault();
    const body = { text: text };
    dispatch(postRequest(body));
    setText("");
  };

  return (
    <>
      <Modal onHide={props.handleClose} show={props.show}>
        <StyledHeader>
          <Modal.Header closeButton={props.handleClose}>
            <Modal.Title>Request</Modal.Title>
          </Modal.Header>
        </StyledHeader>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicStateAddress">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="...I need help"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Form.Text className={!text ? "required" : ""}>
                This field is required!
              </Form.Text>
            </Form.Group>
            <StyledButton>
              <Button
                className="button"
                type="submit"
                onClick={handleSubmitButton}
              >
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

export default RequestForm;
