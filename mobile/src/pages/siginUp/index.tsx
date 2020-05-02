import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import {
    Container,
    Title,
    BackSignIn,
    BackSignInText
} from './styles';
import logo from '../../assets/logo.png'
import Input from '../../components/Input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const SignUp: React.FC = () => {
    const navigation = useNavigation()

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView 
                    keyboardShouldPersistTaps="handled">
                    <Container>
                        <Image source={logo}></Image>
                        <Title>Faca seu cadastro</Title>
                        <Input name="nome" placeholder="nome" />
                        <Input name="email" icon="mail" placeholder="email" />
                        <Input name="password" placeholder="senha" />

                        <Button onPress={() => { }}>Cadastrar</Button>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <BackSignIn onPress={() => { navigation.goBack() }}>
                <Icon name="arrow-left" size={20} color="#fff"></Icon>
                <BackSignInText>Voltar para o login</BackSignInText>
            </BackSignIn>
        </>
    )
}

export default SignUp
