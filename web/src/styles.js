import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  html{
    font-size: 16px;
    font-family: Lato, sans-serif, system-ui;
  }

  *{
      padding: 0;
      margin: 0;
  }

  body {
      background: white;
  }

  .greenbook-logo {
    font-family: Montserrat, sans-serif, system-ui;
    font-weight: 700;
    color: black;
    
    .green{
      font-weight: 700;
      color: green;
    }
  }

  button{
    cursor: pointer;
  }
`;
