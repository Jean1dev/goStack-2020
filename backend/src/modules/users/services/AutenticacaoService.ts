import Usuario from "../typeorm/model/Usuario";
import config from '@config/auth'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError';
import IUserRepository from "../repositories/IUserRepository";
import { inject, injectable } from "tsyringe";

interface Request {
    email: string,
    password: string
}

interface Response {
    user: Usuario,
    token: string
}

@injectable()
export default class AutenticacaoService {

    private repository: IUserRepository

    constructor(@inject('UserRepository') repository: IUserRepository) {
        this.repository = repository
    }

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.repository.findByEmail(email)

        if (!user) {
            throw new AppError('Usuario nao existe', 401)
        }

        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError('Credenciais incorretas', 401)
        }

        const token = sign({}, config.SECRET_KEY, {
            subject: user.id,
            expiresIn: '1d'
        })

        delete user.password
        return {
            user,
            token
        }
    }
}