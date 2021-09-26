import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getRequests, requestLoading } from "../../actions/requestActions";
//components
import MakeRequest from "../requests/MakeRequest";
import Requests from "../requests/Requests";
import RequestForm from "../requests/RequestForm";
import Pagination from "../nav/Pagination";
//styling
import styled from "styled-components";
import { Spinner } from "react-bootstrap";

const CommunityProfile = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { requests, isLoading } = useSelector((state) => state.requests);
  const itemCount = useSelector((state) => state.requests.count);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(requestLoading());
    dispatch(getRequests(page));
  }, [dispatch, page]);

  return (
    <>
      <>
        <MakeRequest handleShow={handleShow} />
        {!isLoading ? (
          <Requests requests={requests} page={page} />
        ) : (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
      </>
      <StyledPagination>
        <Pagination
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

const StyledPagination = styled.div`
  margin-left: 45%;
  .page-link {
    color: #fad39e !important;
  }
  .page-item.active .page-link {
    z-index: 3;
    color: white !important;
    background-color: #ab417f !important;
    border-color: #ab417f !important;
  }
`;

export default CommunityProfile;
