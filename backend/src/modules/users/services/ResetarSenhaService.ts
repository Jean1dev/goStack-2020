import { injectable, inject } from "tsyringe";
import IUserRepository from "../repositories/IUserRepository";
import IUserTokenRepository from "@modules/token/repositories/IUserTokenRepository";
import AppError from "@shared/errors/AppError";
import { hash } from 'bcryptjs'

interface IRequest {
    token: string
    password: string
}

@injectable()
export default class ResetarSenhaService {
    private repository: IUserRepository;
    private userTokenRepository: IUserTokenRepository;

    constructor(
        @inject('UserRepository') repository: IUserRepository,
        @inject('UserTokenRepository') userTokenRepository: IUserTokenRepository) {
        this.userTokenRepository = userTokenRepository
        this.repository = repository
    }

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokenRepository.findByToken(token)

        if (!userToken) {
            throw new AppError('Usuario do token nao existe')
        }
        const user = await this.repository.findById(userToken.user_id)

        if (!user) {
            throw new AppError('Usuario nao existe')
        }

        const hashedPassword = await hash(password, 8)
        user.password = hashedPassword
        await this.repository.save(user)
    }
}