import { useState } from "react";
import { useDispatch } from "react-redux";
import { editRequest, requestLoading } from "../../actions/requestActions";
import { validFields } from "../../utilities/utilities";
import styled from "styled-components";
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const EditRequest = (props) => {
  //state
  const [editText, setEditText] = useState(props.request.text);
  const [errors, setErrors] = useState("");

  const dispatch = useDispatch();

  //helper functions
  const handleSubmitButton = (e) => {
    e.preventDefault();
    if (validFields({ editText }, setErrors)) {
      const requestId = props.request._id;
      const body = { text: editText };
      dispatch(requestLoading());
      dispatch(editRequest(requestId, body));
      setEditText("");
    } else {
      console.log(errors);
    }
  };

  return (
    <>
      <RequestFormContainer>
        <Modal onHide={props.handleClose} animation={false} show={props.show}>
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
                  type="text"
                  placeholder="Text"
                  value={editText}
                  required
                  onChange={(e) => setEditText(e.target.value)}
                />
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
      </RequestFormContainer>
    </>
  );
};

const RequestFormContainer = styled.div`
  padding-top: 5vh;
`;

export default EditRequest;
