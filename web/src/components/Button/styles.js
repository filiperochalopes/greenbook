import styled, { css } from "styled-components";

export default styled.button`
  padding: 5px 10px;
  border-radius: 5px;
  background-color: #0000ff;
  color: #fff;
  border: 3px groove #000;
  margin-bottom: 0.4rem;
  height: 32px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4242ff;
  }

  &:active {
    border-style: inset;
  }

  &.secondary {
    background-color: #383750;
  }

  ${({ disabled }) =>
    disabled &&
    css`
      background-color: #8a8aa0;
      cursor: normal;

      &:hover {
        background-color: #8a8aa0;
      }

      &:active {
        border-style: groove;
      }
    `}
`;
