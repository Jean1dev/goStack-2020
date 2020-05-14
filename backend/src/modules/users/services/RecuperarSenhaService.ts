import { injectable, inject } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";
import IMailProvider from "@shared/providers/MailProvider/IMailProvider";
import AppError from "@shared/errors/AppError";
import IUserTokenRepository from "@modules/token/repositories/IUserTokenRepository";

interface IRequest {
    email: string
}

@injectable()
export default class RecuperarSenhaService {
    private repository: IUserRepository;
    private mailProvider: IMailProvider;
    private userTokenRepository: IUserTokenRepository;

    constructor(
        @inject('UserRepository') repository: IUserRepository,
        @inject('MailProvider') mailProvider: IMailProvider,
        @inject('UserTokenRepository') userTokenRepository: IUserTokenRepository) {
        this.repository = repository
        this.mailProvider = mailProvider
        this.userTokenRepository = userTokenRepository
    }

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.repository.findByEmail(email)

        if (!user) {
            throw new AppError('Usuario nao existe')
        }

        const { token } = await this.userTokenRepository.generate(user.id)
         
        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: 'Recuperacao de senha',
            templateData: {
                template: 'Ola, {{name}}: {{token}}',
                variables: {
                    name: user.name,
                    token
                }
            }
        })
    }

}