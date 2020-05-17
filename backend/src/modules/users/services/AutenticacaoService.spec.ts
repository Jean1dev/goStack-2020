import UserRepositoryMock from "../repositories/mocks/UserRepositoryMock"
import AutenticacaoService from "./AutenticacaoService"
import CriarUsuarioService from "./CriarUsuarioService"
import MockRedisCacheProvider from "@shared/container/providers/CacheProvider/MockRedisCacheProvider"

describe('AutenticacaoService', () => {
    it('deve autenticar', async () => {
        const mockCache = new MockRedisCacheProvider()
        const mock = new UserRepositoryMock()
        const service = new AutenticacaoService(mock)
        const criarUsuarioService = new CriarUsuarioService(mock, mockCache)

        await criarUsuarioService.execute({
            name: 'jean',
            email: 'email',
            password: 'password'
        })

        const response = await service.execute({ email: 'email', password: 'password'})

        expect(response).toHaveProperty('token')
    })
})