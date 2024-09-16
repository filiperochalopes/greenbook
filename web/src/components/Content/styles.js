import styled from "styled-components";

export default styled.article`
  section {
    padding: 32px 16px;
    max-width: 900px;
    margin: 0 auto;

    ul {
      li {
        list-style: none;
        margin: 8px 0;

        button{
          display: inline;
        }

        p{
          display: inline;
        }
      }
    }

    > div {
      display: flex;
      justify-content: space-between;
    }

    button {
      padding: 8px 16px;
      border-radius: 8px;
      margin-right: 4px;
      outline: none;
      cursor: pointer;
    }
  }
`;


export const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
`
