import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  > header {
    height: 144px;
    background: #28262E;

    display: flex;
    align-items: center;
    
    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        background: #999591;
        width: 50px;
        height: 50px;
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;
  margin: 0 auto;
  /* margin: -176px auto 0; */

  width: 100%;
  max-width: 700px;

  form {
      margin: 80px 0;
      width: 340px;
      text-align: center;
      display: flex;
      flex-direction: column;

      h3 {
          margin-bottom: 24px;
      }
  }

`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;

  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #ff9000;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;

      &:hover {
        background: ${shade(0.2, '#ff9000')}
      }
    }
  }
`