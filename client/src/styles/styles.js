import styled from "styled-components";
// import { motion } from "framer-motion";

export const Page = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5rem 10rem;
  color: white;
  /* background-color: #f1efe9; */
`;

export const Description = styled.div`
  flex: 1;
  padding-right: 5rem;
  z-index: 2;
  h2 {
    font-weight: lighter;
  }
`;

export const Image = styled.div`
  flex: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 80vh;
    /* object-fit: cover; */
  }
`;

export const Hide = styled.div`
  overflow: hidden;
`;

//modal styling on bootstrap elements for forms
export const StyledHeader = styled.div`
  .modal-header {
    background-color: #fad39e;
    color: #3a2d49;
  }
`;

export const StyledFooter = styled.div`
  .modal-footer {
    background-color: #fad39e;
    color: #3a2d49;
  }
`;

export const StyledButton = styled.div`
  .button {
    background-color: #ab417f;
    border: none;
  }
`;
