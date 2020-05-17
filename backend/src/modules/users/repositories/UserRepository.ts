import IUserRepository from "./IUserRepository";
import { getRepository, Repository, Not } from "typeorm";
import Usuario from "../typeorm/model/Usuario";
import ICreateUserDto from "../dtos/ICreateUserDto";

export default class UserRepository implements IUserRepository {
    private repository: Repository<Usuario>;

    constructor() {
        this.repository = getRepository(Usuario)
    }

    public async findAllProviders(except_user_id?: string | undefined): Promise<Usuario[]> {
        let users 
        if (except_user_id) {
            users = this.repository.find({
                where: {
                    id: Not(except_user_id)
                }
            })
        } else {
            users = this.repository.find()
        }

        return users
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