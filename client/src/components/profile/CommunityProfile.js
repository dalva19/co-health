import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getRequests } from "../../actions/requestActions";
//components
import NavigationTabs from "./NavigationTabs";
import Requests from "../requests/Requests";
import RequestForm from "../requests/RequestForm";
import Pagination from "../nav/Pagination";
//styling
import styled from "styled-components";

const CommunityProfile = () => {
  const [show, setShow] = useState(false);
  const [page, setPage] = useState(1);
  const { requests } = useSelector((state) => state.requests);
  const requestsLoaded = useSelector((state) => state.requests.loaded);
  const itemCount = useSelector((state) => state.requests.count);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRequests(page));
  }, [dispatch, page]);

  //dispatch to get requests from store??
  return (
    <>
      <NavigationTabs defaultActiveKey="/co-health/profile" />
      <ProfileContainer>
        <div className="add-request">
          <FontAwesomeIcon
            icon={faPlus}
            className="icon fa-2x plus "
            onClick={handleShow}
          />
        </div>
        {requestsLoaded ? <Requests requests={requests} page={page} /> : ""}
      </ProfileContainer>

      <Pagination page={page} setPage={setPage} itemCount={itemCount} />

      <RequestForm
        show={show}
        setShow={setShow}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
};

const ProfileContainer = styled.div`
  /* padding-top: 5vh; */
  padding-left: 2rem;
  .add-request {
    min-height: 20vh;
  }
  .plus {
    cursor: pointer;
  }
`;

export default CommunityProfile;
