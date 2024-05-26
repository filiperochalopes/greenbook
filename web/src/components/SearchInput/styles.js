import styled from "styled-components";

export default styled.div`
  position: relative;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 90vw;
  margin: 0 auto;
  max-width: 720px;

  small{
      font-size: 0.8rem;
      font-weight: lighter;
      line-height: 13px;
      display: block;
      margin-bottom: 8px;
    }

  > div:first-child {
    position: relative;
    width: 100%;

    button{
      display: block;
      position: absolute;
      right: 14px;
      top: 14px;
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;
    }
  }

  label {
    position: absolute;
    top: 14px;
    left: 24px;
    color: #ccc;
  }

  input {
    border: 1px solid #9c9c9c;
    box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.25);
    border-radius: 20px 20px 20px 0;
    padding: 16px 24px;
    width: 100%;
    margin-bottom: 16px;

    &:hover {
      box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.5);
    }

    &:focus,
    &:active {
      border: 1px solid ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 4px green;
      outline: none;
    }

    &::placeholder {
      color: #ccc;
      opacity: 1; /* Firefox */
    }
  }

  ${({ showingResults }) =>
    showingResults &&
    `
    input {
      &::placeholder {
        color: transparent;
        opacity: 0;
      }
    }`}

  #filter {
    text-align: left;
    padding: 8px;
    border: 1px solid ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.ligthGreen};
    border-radius: 8px;

    h3 {
      display: block;
      font-size: 1rem;
      margin-bottom: 8px;

      button {
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;

        svg {
          height: 16px;
        }
      }
    }

    > div {
      display: flex;
      flex-wrap: wrap;


        > div:first-child {
          position: relative;

          button {
            background-color: green;
            color: white;
          }
        }

        > div:last-child {
         display: contents;
        }

        button {
          padding: 4px;
          border-radius: 8px;
          margin-right: 4px;
          margin-top: 4px;
          outline: none;
          cursor: pointer;
        }
    }
  }
`;

export const WarningTooltip = styled.div`
  position: absolute;
  background-color: #c64242;
  color: white;
  top: 56px;
  padding: 16px;
  border-radius: 8px;
  font-size: 1rem;
  box-shadow: 0 5px 150px rgba(0, 0, 0, 0.8);
  z-index: 2;
  font-weight: 300;
  padding-bottom: 56px;

  strong {
    font-weight: bold;
  }

  button {
    border: 3px solid white;
    color: white;
    background-color: transparent;
    outline: none;
    padding: 8px 16px;
    display: block;
    border-radius: 8px;
    position: absolute;
    right: 8px;
    bottom: 8px;

    &:hover {
      background-color: white;
      color: #c64242;
    }
  }
`;
