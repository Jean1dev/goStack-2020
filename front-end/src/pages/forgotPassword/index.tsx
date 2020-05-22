import React, { useCallback, useRef, useState } from 'react'
import { FiLogIn, FiMail } from 'react-icons/fi'
import { Container, Content, Background, AnimationContainer } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErros'
import * as Yup from 'yup'
import { useToast } from '../../hooks/ToastContext'
import { Link, useHistory } from 'react-router-dom'
import api from '../../services/api'

interface ForgoPasswordFormData {
    email: string
}

const ForgotPassword: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()

    const handleSubmit = useCallback(async (data: ForgoPasswordFormData): Promise<void> => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                email: Yup.string().required('Email é obrigatorio').email('Email com formato incorreto')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            setLoading(true)
            await api.post('/password/forgot', {
                email: data.email
            })

            addToast({
                type: 'success',
                title: 'Sucesso',
                description: 'Cheque seu email para recuperar sua senha'
            })
            history.goBack()
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error))
            }

            addToast({
                type: 'error',
                title: 'Erro ao recuperar senha',
                description: 'Cheque suas credencias'
            })
        } finally {
            setLoading(false)
        }
    }, [addToast, history])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber"></img>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Recupere sua senha</h1>

                        <Input icon={FiMail} name="email" placeholder="E-mail"></Input>
                        <Button loading={loading} type="submit">Enviar</Button>

                    </Form>

                    <Link to="/">
                        <FiLogIn />
                        Voltar
                    </Link>

                </AnimationContainer>
            </Content>
            <Background></Background>
        </Container>
    )
}

export default ForgotPassword