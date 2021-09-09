import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getRequests } from "../../actions/requestActions";
//components
import NavigationTabs from "./NavigationTabs";
import Requests from "../requests/Requests";
import RequestForm from "../requests/RequestForm";
//styling
import styled from "styled-components";

const CommunityProfile = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { requests } = useSelector((state) => state.requests);
  const requestsLoaded = useSelector((state) => state.requests.loaded);
  const memberLoaded = useSelector((state) => state.member.loaded);

  const dispatch = useDispatch();

  useEffect(() => {
    if (memberLoaded) {
      dispatch(getRequests());
    }
  }, [dispatch, memberLoaded]);

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
        {requestsLoaded ? <Requests requests={requests} /> : ""}
      </ProfileContainer>

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
