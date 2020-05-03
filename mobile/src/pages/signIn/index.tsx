import React, { useCallback, useRef } from 'react';
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    ScrollView, 
    TextInput, 
    Alert
} from 'react-native'
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
import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErros';
import * as Yup from 'yup'
import { useAuth } from '../../hooks/AuthContext';

interface FormInputData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)
    const passwordInputRef = useRef<TextInput>(null)
    const { signIn } = useAuth()
    
    const handleSubmit = useCallback(async (data: FormInputData): Promise<void> => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email é obrigatorio').email('Email com formato incorreto'),
                password: Yup.string().min(6, 'Senha deve ter mais de 6 digitos')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            signIn({
                email: data.email,
                password: data.password
            })
            
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error))
            }
            
            Alert.alert('Erro na autenticacao', 'Ocorreu um erro no cadastro')
        }
    }, [signIn])

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

                        <Form onSubmit={handleSubmit} ref={formRef}>

                            <Input
                                onSubmitEditing={() => {
                                    passwordInputRef.current?.focus()
                                }}
                                returnKeyType="next" 
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="email" 
                                icon="mail" 
                                placeholder="email" />
                            <Input 
                                ref={passwordInputRef}
                                onSubmitEditing={() => {
                                    formRef.current?.submitForm()
                                 }}
                                returnKeyType="send"
                                secureTextEntry
                                name="password" 
                                icon="lock"
                                placeholder="senha" />

                            <Button onPress={() => {
                                formRef.current?.submitForm()
                             }}>Entrar</Button>
                        </Form>

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
