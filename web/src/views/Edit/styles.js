import styled from "styled-components";

export default styled.article`
    padding: 32px 16px;
    max-width: 900px;
    margin: 0 auto;

    section{
      header{
        p{
          margin-bottom: 16px;
        }
      }
    }

    hr{
      margin: 16px 0;
    }

    #scroll-to-section{
      cursor: pointer;
      margin-bottom: 16px;
      position: fixed;
      right: 16px;
      top: 16px;
      z-index: 100;
      border-radius: 4px;
      padding: 8px;
      background-color: white;
      color: ${({ theme }) => theme.colors.primary};

      li{
        list-style: none;

        &:hover{
          background-color: rgba(0,0,0,0.1);
        }
      }
    }
`

export const StyledOption = styled.div`
    display: flex;
    align-items: center;
    background-color: ${({ color }) => `#${color}`};
    border-radius: 4px;
    margin: 4px;
    
    &:hover > div{
      background-color: rgba(0,0,0,0.1);
    }
    `

export const StyledControl = styled.span`
  display: contents;
  
  > div{
    background-color: ${({ color }) => `#${color}`};
    padding: 2px 4px;
    border-radius: 4px;
  }
`