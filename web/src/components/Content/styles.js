import styled from "styled-components";

export default styled.article`
  section {
    padding: 32px 16px;
    max-width: 900px;
    margin: 0 auto;

    > div {
      display: flex;
      justify-content: space-between;
    }

    header {
      h1 {
        font-family: Montsserat, sans-serif, system-ui;
        display: block;
        margin: 16px 0;
        font-size: 2rem;
      }
    }

    button.result-box {
      padding: 16px;
      box-sizing: border-box;
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.25);
      border-radius: 20px;
      cursor: pointer;
      margin-right: 16px;

      &:hover {
        background: #00802a;
        color: white;
        box-shadow: 0 0 0 4px rgba(0, 0, 0, 1);
      }
    }
  }
`;