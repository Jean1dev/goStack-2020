import UserTokenRepositoryMock from "@modules/token/repositories/UserTokenRepositoryMock"
import UserRepositoryMock from "../repositories/mocks/UserRepositoryMock"
import ResetarSenhaService from "./ResetarSenhaService"

let mockUserTokenRepository: UserTokenRepositoryMock
let mockUserRepository: UserRepositoryMock
let service: ResetarSenhaService

describe('ResetarSenhaService', () => {
    beforeEach(() => {
        mockUserTokenRepository = new UserTokenRepositoryMock()
        mockUserRepository = new UserRepositoryMock()
        service = new ResetarSenhaService(mockUserRepository, mockUserTokenRepository)
    })

    it('deve resetar a senha', async () => {
        const user = await mockUserRepository.create({
            email: 'email',
            name: 'name',
            password: 'password'
        })

        const { token } = await mockUserTokenRepository.generate(user.id)
        await service.execute({
            token,
            password: '123456789'
        })

        const updateUser = await mockUserRepository.findById(user.id)
        expect(updateUser?.password).not.toBe('password')
    })
})