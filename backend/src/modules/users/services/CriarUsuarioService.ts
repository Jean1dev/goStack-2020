import { hash } from 'bcryptjs'
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import Usuario from '../typeorm/model/Usuario';
import { inject, injectable } from 'tsyringe';
import ICacheProvider from '@shared/container/providers/CacheProvider/ICacheProvider';

interface Request {
    name: string
    email: string
    password: string
}

@injectable()
export default class CriarUsuarioService {

    constructor(
        @inject('UserRepository') private repository: IUserRepository,
        @inject('CacheProvider') private cache: ICacheProvider) { }

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

        await this.cache.invalidatePrefix('providers-list')
        return user
    }
}