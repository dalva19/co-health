import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }

  body {
      background-color: white
    }
    
  h1 {
      color: #3B2D48; 
      font-family: "Inter", sans-serif; 
    }

  /* button {
    font-weight: bold; 
    font-size: 1.1rem; 
    cursor: pointer; 
    padding: 0.5rem 1rem; 
    border: 3px solid #AB417F; 
    background: transparent; 
    color: #F18457;
    transition: all 0.5s ease; 
    font-family: 'Inter', sans-serif;
    &:hover{
      background-color: #AB417F; 
      color: white; 
    }
  } */
  
`;

export default GlobalStyle;
