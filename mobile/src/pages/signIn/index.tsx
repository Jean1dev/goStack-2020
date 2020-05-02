import React from 'react';
import { Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import {
    Container,
    Title,
    ForgotPassword,
    ForgotPasswordText,
    CreateAccountButton,
    CreateAccountButtonText
} from './styles';
import logo from '../../assets/logo.png'
import Input from '../../components/Input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';

const SignIn: React.FC = () => {
    const navigation = useNavigation()

    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                enabled
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
                    <Container>
                        <Image source={logo}></Image>
                        <Title>Faca seu login</Title>

                        <Input name="email" icon="mail" placeholder="email" />
                        <Input name="password" placeholder="senha" />

                        <Button onPress={() => { }}>Entrar</Button>

                        <ForgotPassword onPress={() => { }}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => { navigation.navigate('signUp') }}>
                <Icon name="log-in" size={20} color="#ff9000"></Icon>
                <CreateAccountButtonText>Criar conta</CreateAccountButtonText>
            </CreateAccountButton>
        </>
    )
}

export default SignIn
