import React, { useCallback, useRef, useState } from 'react'
import { FiLock } from 'react-icons/fi'
import { Container, Content, Background, AnimationContainer } from './styles'
import logo from '../../assets/logo.svg'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Form } from '@unform/web'
import { FormHandles } from '@unform/core'
import getValidationErrors from '../../utils/getValidationErros'
import * as Yup from 'yup'
import { useToast } from '../../hooks/ToastContext'
import { useHistory, useLocation } from 'react-router-dom'
import api from '../../services/api'

interface ResetPasswordFormData {
    password: string
    password_confirmation: string
}

const ResetPassword: React.FC = () => {
    const [loading, setLoading] = useState(false)
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const history = useHistory()
    const location = useLocation()

    const handleSubmit = useCallback(async (data: ResetPasswordFormData): Promise<void> => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                password: Yup.string().required('A senha é obrigatorio'),
                password_confirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Confirmacao Incorreta')
            })

            await schema.validate(data, {
                abortEarly: false
            })

            setLoading(true)
            await api.post('/password/reset', {
                password: data.password,
                token: location.search.replace('?token=', '')
            })

            addToast({
                type: 'success',
                title: 'Sucesso',
                description: 'Sucesso Ao recuperar sua senha'
            })
            history.push('/')
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error))
            }

            addToast({
                type: 'error',
                title: 'Erro ao resetar senha',
                description: 'Tente novamente'
            })
        } finally {
            setLoading(false)
        }
    }, [addToast, history, location.search])

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <img src={logo} alt="goBarber"></img>

                    <Form ref={formRef} onSubmit={handleSubmit}>
                        <h1>Resete sua senha</h1>

                        <Input icon={FiLock} name="password" placeholder="Nova Senha" type="password"></Input>
                        <Input icon={FiLock} name="password_confirmation" placeholder="Confirme Senha" type="password"></Input>

                        <Button loading={loading} type="submit">Alterar Senha</Button>

                    </Form>

                </AnimationContainer>
            </Content>
            <Background></Background>
        </Container>
    )
}

export default ResetPassword