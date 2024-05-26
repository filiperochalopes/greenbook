import styled from "styled-components";

export default styled.header`
  width: 100vw;
  text-align: center;
  margin-top: 16px;
  transition: all 0.5s;

  img{
    height: 100px;
    margin-bottom: 8px;
  }

  ${({ showingResults, loading }) => !showingResults && !loading && `
    margin-top: calc(50vh - 210px);
  `}

  ${({ loading }) => !loading && `
    padding-top: 6px;
  `}
`;
