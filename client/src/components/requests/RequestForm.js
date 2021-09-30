import { useState } from "react";
import { useDispatch } from "react-redux";
import { postRequest } from "../../actions/requestActions";
import { validFields } from "../../utilities/utilities";
//style
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const RequestForm = (props) => {
  //state
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();

  //helper functions
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validFields({ text }, setErrors)) {
      const body = { text: text };
      dispatch(postRequest(body));
      setText("");
    } else {
      console.log(errors);
    }
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
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicStateAddress">
              <Form.Label>Text</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="...I need help"
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
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

export default RequestForm;
