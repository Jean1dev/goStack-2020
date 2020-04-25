import React, { useCallback, useRef } from 'react'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { Container, Content, Background } from './styles'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErros'

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null)

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
        } catch (error) {
            formRef.current?.setErrors(getValidationErrors(error))
        }
    }, [])

    return (
        <Container>
            <Background></Background>
            <Content>
                <img src={logo} alt="goBarber"></img>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <h1>Faca seu Cadastro</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome"></Input>
                    <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
                    <Input icon={FiLock} name="password" placeholder="Senha" type="password"></Input>

                    <Button type="submit">Cadastrar</Button>
                </Form>

                <a href="forgot">
                    <FiArrowLeft />
                Voltar</a>

            </Content>
        </Container>
    )
}

export default SignUp