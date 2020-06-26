import IUserRepository from "@modules/users/repositories/IUserRepository";
import Usuario from "@modules/users/typeorm/model/Usuario";
import { injectable, inject } from "tsyringe";
import ICacheProvider from "@shared/container/providers/CacheProvider/ICacheProvider";
import { classToClass } from "class-transformer";

@injectable()
export default class ListPrestadoresService {

    constructor(
        @inject('UserRepository') private repository: IUserRepository,
        @inject('CacheProvider') private cache: ICacheProvider) {}

    public async execute(user_id: string): Promise<Usuario[]> {
        let users = await this.cache.get<Usuario[]>(`providers-list:${user_id}`)

        if (!users) {
            users = await this.repository.findAllProviders(user_id)
            await this.cache.save(`providers-list:${user_id}`, classToClass(users))
        }
        
        return users
    }
}