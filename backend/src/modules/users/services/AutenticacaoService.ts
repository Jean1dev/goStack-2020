import { Repository, getRepository } from "typeorm";
import Usuario from "../typeorm/model/Usuario";
import config from '@config/auth'
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken'
import AppError from '@shared/errors/AppError';

interface Request {
    email: string,
    password: string
}

interface Response {
    user: Usuario,
    token: string
}

export default class AutenticacaoService {

    private repository: Repository<Usuario>

    constructor() {
        this.repository = getRepository(Usuario)
    }

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.repository.findOne({
            where: { email }
        })

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