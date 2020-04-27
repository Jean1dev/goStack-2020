import React, { useCallback, useRef } from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { Container, Content, Background, AnimationContainer } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErros'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
import { useToast } from '../../hooks/ToastContext'
import { Link, useHistory } from 'react-router-dom'

interface SignInFormData {
    email: string
    password: string
}

const SignIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { signIn } = useAuth()
    const { addToast } = useToast()
    const history = useHistory()

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

            await signIn({
                email: data.email,
                password: data.password
            })

            history.push('/dashboard')
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error))
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticacao',
                description: 'Cheque suas credencias'
            })
        }
    }, [signIn, addToast, history])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber"></img>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Faca seu logon</h1>

                        <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
                        <Input icon={FiLock} name="password" placeholder="Senha" type="password"></Input>

                        <Button type="submit">Entrar</Button>

                        <a href="forgot">Esqueci minha senha</a>

                    </Form>

                    <Link to="/signup">
                        <FiLogIn />
                        Criar conta
                    </Link>

                </AnimationContainer>
            </Content>
            <Background></Background>
        </Container>
    )
}

export default SignIn