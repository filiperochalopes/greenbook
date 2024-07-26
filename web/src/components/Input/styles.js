import styled from "styled-components";

export default styled.div`
  position: relative;
  box-sizing: border-box;
  max-width: 200px;
  padding-right: 4px;

  input,
  textarea {
    outline: none;
    border: none;
    border-radius: 5px;
    background: #f0f0f0;
    padding: 0.5rem 1rem;
    margin-bottom: 0.2rem;
    border: 1px solid green;
    box-sizing: border-box;
    height: 2rem;
    width: 100%;

    &::placeholder {
      color: #ccc;
    }
  }

  textarea {
    min-height: 120px;
    width: 400px;
  }

  p {
    font-size: 0.7rem;
  }

  span {
    color: red;
  }

  span.error {
    display: block;
    color: red;
    font-size: 0.8rem;
  }
`;
