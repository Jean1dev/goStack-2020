import UserRepositoryMock from "../repositories/mocks/UserRepositoryMock"
import CriarUsuarioService from "./CriarUsuarioService"
import AppError from "@shared/errors/AppError"

describe('CriarUsuarioService', () => {
    it('deve criar um novo usuario', async () => {
        const mock = new UserRepositoryMock()
        const service = new CriarUsuarioService(mock)
        const user = await service.execute({
            name: 'Jeanluca',
            email: 'email',
            password: 'password'
        })

        expect(user).toHaveProperty('id')
    })

    it('nao deve permitir criar dois usuarios com o mesmo email', async () => {
        const mock = new UserRepositoryMock()
        const service = new CriarUsuarioService(mock)
        const user = await service.execute({
            name: 'Jeanluca',
            email: 'email',
            password: 'password'
        })

        expect(user).toHaveProperty('id')
        expect(
            service.execute({
                name: 'Jeanluca',
                email: 'email',
                password: 'password'
            })  
        ).rejects.toBeInstanceOf(AppError)
    })
})