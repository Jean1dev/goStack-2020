import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, Background } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErros'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { signIn } = useAuth()

    const handleSubmit = useCallback(async (data: SignInFormData): Promise<void> => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email é obrigatorio').email('Email com formato incorreto'),
                password: Yup.string().required('A senha é obrigatorio')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            signIn({
                email: data.email,
                password: data.password
            })
        } catch (error) {
            formRef.current?.setErrors(getValidationErrors(error))
        }
    }, [signIn])

    return (
        <Container>
            <Content>
                <img src={logo} alt="goBarber"></img>
    
                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faca seu logon</h1>
    
                    <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
                    <Input icon={FiLock} name="password" placeholder="Senha" type="password"></Input>
                    
                    <Button type="submit">Entrar</Button>
    
                    <a href="forgot">Esqueci minha senha</a>
    
                </Form>
    
                <a href="forgot">
                    <FiLogIn />
                    Criar conta</a>
    
            </Content>
            <Background></Background>
        </Container>
    )
}

export default SignIn