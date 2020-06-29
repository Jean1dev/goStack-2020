import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
`;

export const Text = styled.Text`
    font-size: 32px;
    color: #f4ede8;
    font-family: 'RoboSlab-Medium';
    margin-top: 48px;
    text-align: center;
`

export const Description = styled.Text`
    font-family: 'RoboSlab-Regular';
    font-size: 18px;
    color: #999591;
    margin-top: 16px;
`

export const OK = styled(RectButton)`
    background: #ff9000;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin-top: 24;
    padding: 12px 24px;
`

export const OkButtonText = styled.Text`
    font-size: 18px;
    color: #f4ede8;
    font-family: 'RoboSlab-Medium';
    text-align: center;
`