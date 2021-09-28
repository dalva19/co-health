import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getRequests, requestLoading } from "../../actions/requestActions";
//components
import MakeRequest from "../requests/MakeRequest";
import Requests from "../requests/Requests";
import RequestForm from "../requests/RequestForm";
import PageNav from "../nav/PageNav";
//styling
import { Row, Col } from "react-bootstrap";
import { StyledPagination } from "../../styles/styles";
import styled from "styled-components";

const CommunityProfile = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { member } = useSelector((state) => state.member);
  const { requests, isLoading } = useSelector((state) => state.requests);
  const itemCount = useSelector((state) => state.requests.count);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (member[0].requests.length > 0) {
      dispatch(requestLoading());
      dispatch(getRequests(page));
    }
  }, [dispatch, page, member]);

  return (
    <>
      <>
        <MakeRequest handleShow={handleShow} />
        {!isLoading ? (
          <Requests requests={requests} page={page} />
        ) : (
          <StyledIntructions>
            <Row>
              <Col md={{ span: 6, offset: 3 }}>
                <h2>
                  Click on the <span>plus sign</span> to make a request!
                </h2>
              </Col>
            </Row>
          </StyledIntructions>
        )}
      </>

      <StyledPagination>
        <PageNav
          className="pages-container"
          page={page}
          setPage={setPage}
          itemCount={itemCount}
        />
      </StyledPagination>

      <RequestForm
        show={show}
        page={page}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

const StyledIntructions = styled.div`
  height: 50vh;
  padding: 5rem 10rem;
  h2 {
    font-weight: lighter;
  }
  span {
    color: #f18457;
    font-weight: bold;
    font-style: italic;
  }
`;
export default CommunityProfile;
