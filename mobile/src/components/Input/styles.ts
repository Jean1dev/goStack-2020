import styled from 'styled-components/native';
import FIcon from 'react-native-vector-icons/Feather'

export const Container = styled.View`
    width: 100%;
    height: 60px;
    padding: 0 16px;
    background: #232129;
    border-radius: 10px;
    margin-bottom: 8px;

    flex-direction: row;
    align-items: center;
`;

export const TextInput = styled.TextInput`
    flex: 1;
    color: #FFF;
    font-size: 16px;
    font-family: 'RoboSlab-Regular'
`

export const Icon = styled(FIcon)`
    margin-right: 16px;
`