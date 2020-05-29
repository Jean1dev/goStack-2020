import React, { useCallback, useRef, ChangeEvent } from 'react'
import { FiMail, FiUser, FiLock, FiCamera, FiArrowLeft } from 'react-icons/fi'
import { Container, Content, AvatarInput } from './styles'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import Input from '../../components/Input'
import Button from '../../components/Button'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErros'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { useToast } from '../../hooks/ToastContext'
import { useAuth } from '../../hooks/AuthContext'

const Profile: React.FC = () => {
    const formRef = useRef<FormHandles>(null)
    const { addToast } = useToast()
    const { user, updateUser } = useAuth()

    const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = new FormData()
            data.append('avatar', e.target.files[0])
            api.patch('/usuarios/avatar', data).then(response => {
                addToast({
                    type: 'success',
                    title: 'Avatar atualizado'
                })
                updateUser(response.data)
            })
        }
        
    }, [addToast, updateUser])

    const handleSubmit = useCallback(async (data: object): Promise<void> => {
        try {
            formRef.current?.setErrors({})
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome é obrigatorio'),
                email: Yup.string().required('Email é obrigatorio').email('Email com formato incorreto'),
            })

            await schema.validate(data, {
                abortEarly: false
            })

            const ret = await api.put('/usuarios', data)
            addToast({
                type: 'success',
                title: 'Cadastro atualizado com sucesso',
            })
            updateUser(ret.data)

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                formRef.current?.setErrors(getValidationErrors(error))
            }
            
            addToast({
                type: 'error',
                title: 'Ocorreu um erro na atualizacao'
            })
        }
    }, [addToast, updateUser])

    return (
        <Container>
            <header>
                <div>
                    <Link to="/dashboard">
                        <FiArrowLeft/>
                    </Link>
                </div>
            </header>
            <Content>

                <Form ref={formRef} initialData={{
                    name: user.name,
                    email: user.email
                }} onSubmit={handleSubmit}>
                    <AvatarInput>
                        <img src={user.avatar_url} alt={user.name}></img>
                        <label htmlFor="avatar">
                            <FiCamera/>
                            <input type="file" id="avatar" onChange={handleAvatarChange}></input>
                        </label>
                        
                    </AvatarInput>
                    <h1>Meu Perfil</h1>

                    <Input icon={FiUser} name="name" placeholder="Nome"></Input>
                    <Input icon={FiMail} name="email" placeholder="E-mail"></Input>

                    <Input icon={FiLock} name="old_password" placeholder="Senha antiga" type="password"></Input>
                    <Input icon={FiLock} name="password" placeholder="Nova senha" type="password"></Input>
                    <Input icon={FiLock} name="password" placeholder="Confirmar senha" type="password"></Input>

                    <Button type="submit">Confirmar mudancas</Button>
                </Form>

            </Content>
        </Container>
    )
}

export default Profile