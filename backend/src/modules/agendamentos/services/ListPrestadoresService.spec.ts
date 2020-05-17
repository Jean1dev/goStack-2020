import 'reflect-metadata'
import ListPrestadoresService from "./ListPrestadoresService"
import UserRepositoryMock from "@modules/users/repositories/mocks/UserRepositoryMock"
import MockRedisCacheProvider from '@shared/container/providers/CacheProvider/MockRedisCacheProvider'

let mockUserRepository: UserRepositoryMock
let service: ListPrestadoresService
let mockCache: MockRedisCacheProvider

describe('ListPrestadoresService', () => {
    beforeEach(() => {
        mockUserRepository = new UserRepositoryMock()
        mockCache = new MockRedisCacheProvider()
        service = new ListPrestadoresService(mockUserRepository, mockCache)
    })

    it('deve listar todos prestadores', async () => {
        const u1 = await mockUserRepository.create({
            name: 'jo',
            email: 'email',
            password: 'password'
        })

        const u2 = await mockUserRepository.create({
            name: 'carla',
            email: 'email_carla',
            password: 'password'
        })

        const u3 = await mockUserRepository.create({
            name: 'jooeo',
            email: 'emailjojoj',
            password: 'password'
        })

        const providers = await service.execute(u2.id)
        expect(providers).toEqual([u1, u3])
    })
})