import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import Usuario from '../typeorm/model/Usuario';
import { inject, injectable } from 'tsyringe';

interface Request {
    name: string
    email: string
    password: string
}

@injectable()
export default class CriarUsuarioService {

    private repository: IUserRepository

    constructor(@inject('UserRepository') repository: IUserRepository) {
        this.repository = repository
    }

    public async execute({ name, email, password }: Request): Promise<Usuario | undefined> {
        const checkUserExistes = await this.repository.findByEmail(email)

        if (checkUserExistes) {
            throw new AppError('Email ja cadastrado')
        }

        const hashedPassword = await hash(password, 8)
        const user = this.repository.create({
            name,
            email,
            password: hashedPassword
        })

        return user
    }
}