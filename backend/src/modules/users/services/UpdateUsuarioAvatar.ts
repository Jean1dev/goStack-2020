import fs from 'fs'
import path from 'path'
import Usuario from "../typeorm/model/Usuario";
import config from '@config/upload'
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUserRepository';
import { inject, injectable } from 'tsyringe';
import IStorageProvider from '@shared/providers/StorageProvider/IStorageProvider';

interface Request {
    user_id: string,
    avatarFileName: string
}

@injectable()
export default class UpdateUsuarioAvatarService {
    private repository: IUserRepository
    private storage: IStorageProvider

    constructor(
        @inject('UserRepository') repository: IUserRepository,
        @inject('StorageProvider') storage: IStorageProvider) 
    {
        this.repository = repository
        this.storage = storage
    }

    public async execute({ user_id, avatarFileName }: Request): Promise<Usuario> {
        const user = await this.repository.findById(user_id)

        if (!user) {
            throw new AppError('Usuario nao encontrado', 401)
        }

        if (user.avatar) {
            await this.storage.deleteFile(user.avatar)
        }

        const filename = await this.storage.saveFile(avatarFileName)
        user.avatar = filename
        await this.repository.save(user)
        return user
    }
}