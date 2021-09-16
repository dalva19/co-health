import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//components
import HealthCareProfile from "./HealthcareProfile";
import CommunityProfile from "./CommunityProfile";
import HealthcareLicenseForm from "./HealthcareLiscenceForm";
import styled from "styled-components";

const MemberProfile = () => {
  const { member } = useSelector((state) => state.member);
  const { credentials } = useSelector((state) => state.member.member[0]);
  const healthcareMember = "healthcare member";
  const communityMember = "community member";

  const [modal, setModal] = useState("");

  const handleShowLicenseModal = () => {
    setModal("license-modal");
  };

  const handleClose = () => {
    setModal("close");
  };

  //loads with profile info based on who is logged in
  return (
    <>
      <MemberProfileContainer>
        {member[0].profileType.trim().toLowerCase() ===
          healthcareMember.trim().toLowerCase() && credentials.verified ? (
          <HealthCareProfile />
        ) : (
          <>
            <h2>You must submit your license information for verification</h2>
            <button onClick={handleShowLicenseModal}>Verify License</button>
          </>
        )}
        {member[0].profileType.trim().toLowerCase() ===
        communityMember.trim().toLowerCase() ? (
          <CommunityProfile />
        ) : (
          ""
        )}
      </MemberProfileContainer>

      <HealthcareLicenseForm
        show={modal === "license-modal"}
        handleClose={handleClose}
      />
    </>
  );
};

const MemberProfileContainer = styled.div`
  /* padding-top: 1rem; */
`;

export default MemberProfile;
