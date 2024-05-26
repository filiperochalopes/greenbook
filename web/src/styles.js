import { createGlobalStyle } from "styled-components";

export const theme = {
  colors: {
    primary: "green",
    ligthGreen: "#33c995",
  },
};

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
      background: #F9EDDB;
  }

  h1,
  h2 {
    font-family: Montsserat, sans-serif, system-ui;
    display: block;
    margin: 16px 0;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
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

  .loading-bar {
    height: 6px;
    background-color: #333; /* Customize color as needed */
    width: 0; /* Initial width is 0 */
    animation: loading-bar-animate 2s linear infinite;
}

@keyframes loading-bar-animate {
    0% {
        width: 0;
    }
    50% {
        width: 100%;
    }
    100% {
        width: 0;
    }
}

  button{
    cursor: pointer;
  }
`;
