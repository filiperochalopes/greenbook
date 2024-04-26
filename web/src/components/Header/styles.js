import styled from "styled-components";

export default styled.header`
  width: 100vw;
  padding: 0 16px;
  text-align: center;
  margin-top: 16px;

  img{
    height: 100px;
    margin-bottom: 8px;
  }

  ${({ showingResults }) => !showingResults && `
    margin-top: calc(50vh - 210px);
  `}
`;
