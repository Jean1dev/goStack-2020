import UserRepositoryMock from "../repositories/mocks/UserRepositoryMock"
import AtualizarPerfilService from "./AtualizarPerfilService"
import AppError from "@shared/errors/AppError"

let userRepositoryMock: UserRepositoryMock
let service: AtualizarPerfilService

describe('AtualizarPerfilService', () => {
    beforeEach(() => {
        userRepositoryMock = new UserRepositoryMock()
        service = new AtualizarPerfilService(userRepositoryMock)
    })

    it('deve atualizar o perfil', async () => {
        const user = await userRepositoryMock.create({
            email: 'email',
            name: 'name',
            password: 'password'
        })

        const updateUser = await service.execute({
            user_id: user.id,
            name: 'name_alterado',
            email: 'email_alterado'
        })

        expect(updateUser.name).toBe('name_alterado')
        expect(updateUser.email).toBe('email_alterado')
    })

    it('nao pode alterar o email para um email ja utilizado', async () => {
        const user = await userRepositoryMock.create({
            email: 'email',
            name: 'name',
            password: 'password'
        })

        await userRepositoryMock.create({
            email: 'email_utilzado',
            name: 'name_1',
            password: 'password_1'
        })

        await expect(service.execute({
            user_id: user.id,
            name: 'name_alterado',
            email: 'email_utilzado'
        })).rejects.toBeInstanceOf(AppError)
    })

    it('deve atualziar a senha', async () => {
        const user = await userRepositoryMock.create({
            email: 'email',
            name: 'name',
            password: 'password'
        })

        const updateUser = await service.execute({
            user_id: user.id,
            name: 'name_alterado',
            email: 'email_utilzado',
            old_password: 'password',
            password: 'changed'
        })

        expect(updateUser.password).not.toBe('password')
    })
})