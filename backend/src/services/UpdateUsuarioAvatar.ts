import fs from 'fs'
import path from 'path'
import { Repository, getRepository } from "typeorm";
import Usuario from "../model/Usuario";
import config from '../config/upload'
import AppError from '../errors/AppError';

interface Request {
    user_id: string,
    avatarFileName: string
}

export default class UpdateUsuarioAvatarService {
    private repository: Repository<Usuario>

    constructor() {
        this.repository = getRepository(Usuario)
    }

    public async execute({ user_id, avatarFileName }: Request): Promise<Usuario> {
        const user = await this.repository.findOne(user_id)

        if (!user) {
            throw new AppError('Usuario nao encontrado', 401)
        }

        if (user.avatar) {
            const avatarAntigoPath = path.join(config.directory, user.avatar)
            const fileExists = await fs.promises.stat(avatarAntigoPath)

            if (fileExists) {
                await fs.promises.unlink(avatarAntigoPath)
            }
        }

        user.avatar = avatarFileName
        await this.repository.save(user)
        return user
    }
}