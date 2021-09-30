import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  postOffer,
  getOffers,
  offersLoading,
} from "../../actions/offerActions";
import { validFields } from "../../utilities/utilities";
//style
import { Button, Form, Modal } from "react-bootstrap";
import { StyledButton, StyledHeader, StyledFooter } from "../../styles/styles";

const OfferForm = (props) => {
  //state
  const [page, setPage] = useState(1);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState("");
  const { isLoading } = useSelector((state) => state.offers);
  const dispatch = useDispatch();

  //helper functions
  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validFields({ text }, setErrors)) {
      const body = { text: text };

      dispatch(offersLoading());
      dispatch(postOffer(props.requestId, body));

      if (!isLoading) {
        dispatch(getOffers(page));
      }
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
            <Modal.Title>Offer</Modal.Title>
          </Modal.Header>
        </StyledHeader>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="formBasicStateText">
              <Form.Label>Offer your services</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="...I can help!"
                value={text}
                required
                onChange={(e) => setText(e.target.value)}
              />
              <Form.Text className={!text ? "required" : ""}>
                This field is required!
              </Form.Text>
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

export default OfferForm;
