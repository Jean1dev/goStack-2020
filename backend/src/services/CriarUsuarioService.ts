import UsuarioModel from '../model/Usuario'
import { getRepository, Repository } from 'typeorm'
import { hash } from 'bcryptjs'
import AppError from '../errors/AppError'

interface Request {
    name: string
    email: string
    password: string
}

export default class CriarUsuarioService {

    private repository: Repository<UsuarioModel>

    constructor() {
        this.repository = getRepository(UsuarioModel)
    }

    public async execute({ name, email, password }: Request): Promise<UsuarioModel> {
        const checkUserExistes = await this.repository.findOne({
            where: { email }
        })

        if (checkUserExistes) {
            throw new AppError('Email ja cadastrado')
        }

        const hashedPassword = await hash(password, 8)
        const user = this.repository.create({
            name,
            email,
            password: hashedPassword
        })

        await this.repository.save(user)
        return user
    }
}