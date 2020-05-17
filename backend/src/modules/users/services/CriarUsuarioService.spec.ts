import UserRepositoryMock from "../repositories/mocks/UserRepositoryMock"
import CriarUsuarioService from "./CriarUsuarioService"
import AppError from "@shared/errors/AppError"
import MockRedisCacheProvider from "@shared/container/providers/CacheProvider/MockRedisCacheProvider"

let mockCache: MockRedisCacheProvider
let userRepo: UserRepositoryMock
let service: CriarUsuarioService

describe('CriarUsuarioService', () => {
    beforeEach(() => {
        userRepo = new UserRepositoryMock()
        mockCache = new MockRedisCacheProvider()
        service = new CriarUsuarioService(userRepo, mockCache)
    })

    it('deve criar um novo usuario', async () => {
        const user = await service.execute({
            name: 'Jeanluca',
            email: 'email',
            password: 'password'
        })

        expect(user).toHaveProperty('id')
    })

    it('nao deve permitir criar dois usuarios com o mesmo email', async () => {
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