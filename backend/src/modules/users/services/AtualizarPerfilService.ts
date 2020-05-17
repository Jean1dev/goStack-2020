import { injectable, inject } from "tsyringe"
import IUserRepository from "../repositories/IUserRepository"
import Usuario from "../typeorm/model/Usuario"
import AppError from "@shared/errors/AppError"
import { hash } from "bcryptjs"

interface IRequest {
    user_id: string
    name: string
    email: string
    old_password?: string
    password?: string
}

@injectable()
export default class AtualizarPerfilService {
    private repository: IUserRepository

    constructor(@inject('UserRepository') repository: IUserRepository) {
        this.repository = repository
    }

    public async execute({ user_id, name, email, password, old_password }: IRequest): Promise<Usuario> {
        const user = await this.repository.findById(user_id)
        if (!user) {
            throw new AppError('Usuario nao existe')
        }

        if (await this.jaExisteEsseEmailNoBanco(email, user.id)) {
            throw new AppError('Ja existe um usuario com esse email')
        }

        Object.assign(user, {
            name,
            email
        })

        if (password) {
            user.password = await hash(password, 8)
        }

        await this.repository.save(user)
        return user
    }

    private async jaExisteEsseEmailNoBanco(email: string, id: string): Promise<Boolean> {
        const user = await this.repository.findByEmail(email)
        return !!user && user.id != id
    }
}