import UserRepositoryMock from "../repositories/mocks/UserRepositoryMock"
import RecuperarSenhaService from "./RecuperarSenhaService"
import MailProviderMock from "@shared/providers/MailProvider/MailProviderMock"
import AppError from "@shared/errors/AppError"
import UserTokenRepositoryMock from "@modules/token/repositories/UserTokenRepositoryMock"

let mockUserTokenRepository: UserTokenRepositoryMock
let mockEmailProvider: MailProviderMock
let mockUserRepository: UserRepositoryMock
let service: RecuperarSenhaService

describe('RecuperarSenhaService', () => {
    beforeEach(() => {
        mockUserTokenRepository = new UserTokenRepositoryMock()
        mockEmailProvider = new MailProviderMock()
        mockUserRepository = new UserRepositoryMock()
        service = new RecuperarSenhaService(mockUserRepository, mockEmailProvider, mockUserTokenRepository)
    })

    it('deve recuperar a senha', async () => {
        const sendMail = jest.spyOn(mockEmailProvider, 'sendMail')

        await mockUserRepository.create({
            email: 'email',
            name: 'name',
            password: 'password'
        })

        await service.execute({ email: 'email' })
        expect(sendMail).toHaveBeenCalled()
    })

    it('nao permitir que um usuario que nao exista solicite uma recuperacao', async () => {
        await expect(
            service.execute({ email: 'email' })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('deve gerar um token ao recuperar senha', async () => {
        const generateToken = jest.spyOn(mockUserTokenRepository, 'generate')

        const user = await mockUserRepository.create({
            email: 'email',
            name: 'name',
            password: 'password'
        })

        await service.execute({ email: 'email' })

        expect(generateToken).toHaveBeenCalledWith(user.id)
    })
})