import React, { useRef, useCallback } from 'react';
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
    BackSignIn,
    BackSignInText
} from './styles';
import logo from '../../assets/logo.png'
import Input from '../../components/Input';
import Button from '../../components/button';
import Icon from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErros';
import api from '../../services/api'

const SignUp: React.FC = () => {
    const navigation = useNavigation()
    const formRef = useRef<FormHandles>(null)
    const emailInputRef = useRef<TextInput>(null)
    const passwordInputRef = useRef<TextInput>(null)

    const handleSubmit = useCallback(async (data: object): Promise<void> => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatorio'),
                email: Yup.string().required('Email é obrigatorio').email('Email com formato incorreto'),
                password: Yup.string().min(6, 'Senha deve ter mais de 6 digitos')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            await api.post('/usuarios', data)
            Alert.alert('Sucesso', 'Cadastro realizado com sucesso')
            navigation.goBack()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error))
            }
            
            Alert.alert('Erro na autenticacao', 'Ocorreu um erro no cadastro')
        }
    }, [])

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

                        <Form ref={formRef} onSubmit={handleSubmit}>

                            <Input 
                                onSubmitEditing={() => emailInputRef.current?.focus()}
                                returnKeyType="next"
                                autoCapitalize="words"
                                autoCorrect={false}
                                name="name" 
                                icon="user"
                                placeholder="nome" />
                            <Input
                                onSubmitEditing={() => passwordInputRef.current?.focus()}
                                returnKeyType="next"
                                ref={emailInputRef}
                                autoCapitalize="none"
                                autoCorrect={false}
                                keyboardType="email-address"
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
                                textContentType="newPassword"
                                placeholder="senha" />

                            <Button onPress={() => {
                                formRef.current?.submitForm()
                             }}>Cadastrar</Button>
                        </Form>
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
