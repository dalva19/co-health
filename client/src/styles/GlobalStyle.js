import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
  *{
    margin: 0; 
    padding: 0; 
    box-sizing: border-box; 
  }

  body {
      /* background-color: #F1EFE9 */
      background-color: white
    }
    
  h1, h2 {
      color: #3B2D48; 
      font-family: "Inter", sans-serif; 
  } 
  p {
    font-family: "Inter", sans-serif; 
  }
  
  
`;

export default GlobalStyle;
