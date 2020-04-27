import styled, { keyframes } from 'styled-components';
import { shade } from 'polished'
import image from '../../assets/sign-in-background.png'

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  width: 100%;
  max-width: 700px;

  a {
          color: #FF9000;
          display: block;
          margin-top: 24px;
          text-decoration: none;
          transition: color 0.2s;

          display: flex;
          align-items: center;

          svg {
              margin-right: 16px;
          }
          &:hover {
            color: ${shade(0.2, '#FF9000')};
          }
      }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${image}) no-repeat center;
  background-size: cover;
`;

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

export const AnimationContainer = styled.div`
  display: flex;
  flex-direction: column;
  place-content: center;
  align-items: center;

  animation: ${appearFromLeft} 1s;

  form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h3 {
            margin-bottom: 24px;
        }
      
        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
              color: ${shade(0.2, '#F4EDE8')};
            }
        }
    }
`