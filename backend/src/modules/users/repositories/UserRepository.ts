import IUserRepository from "./IUserRepository";
import { getRepository, Repository } from "typeorm";
import Usuario from "../typeorm/model/Usuario";
import ICreateUserDto from "../dtos/ICreateUserDto";

export default class UserRepository implements IUserRepository {
    private repository: Repository<Usuario>;

    constructor() {
        this.repository = getRepository(Usuario)
    }

    public async findById(id: string): Promise<Usuario | undefined> {
        return await this.repository.findOne(id)
    }

    public async findByEmail(email: string): Promise<Usuario | undefined> {
        return await this.repository.findOne({
            where: { email }
        })
    }

    public async create(data: ICreateUserDto): Promise<Usuario | undefined> {
        const user = this.repository.create(data)
        await this.repository.save(user)
        return user
    }

    public async save(user: Usuario): Promise<Usuario | undefined> {
        return await this.repository.save(user)
    }
}