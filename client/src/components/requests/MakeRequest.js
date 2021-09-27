import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
//styling
import styled from "styled-components";
import { Row, Col } from "react-bootstrap";
import addPost from "../../img/undraw_Add_post_re_174w.svg";

const MakeRequest = ({ handleShow }) => {
  return (
    <StyledMakeRequest>
      <Row className="row">
        <Col className="col" md={{ span: 6, offset: 3 }}>
          <FontAwesomeIcon
            icon={faPlus}
            className="icon fa-2x plus "
            onClick={handleShow}
          />
          <StyledImage>
            <img className="image" src={addPost} alt="add-request" />
          </StyledImage>
        </Col>
      </Row>
    </StyledMakeRequest>
  );
};

const StyledMakeRequest = styled.div`
  height: 70vh;
  padding-top: 5rem;
  .col {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .plus {
    margin-top: 2rem;
    margin-left: 2rem;
    cursor: pointer;
    color: black;
  }
`;

const StyledImage = styled.div`
  img {
    margin-right: 2rem;
    width: 100%;
    height: 40vh;
    flex: 1;
  }
`;

export default MakeRequest;
