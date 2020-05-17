import IUserRepository from "../IUserRepository";
import Usuario from "@modules/users/typeorm/model/Usuario";
import ICreateUserDto from "@modules/users/dtos/ICreateUserDto";
import { uuid } from 'uuidv4'

export default class UserRepositoryMock implements IUserRepository {
    private usuarios: Usuario[] = []

    public async findAllProviders(except_user_id?: string | undefined): Promise<Usuario[]> {
        let users = this.usuarios

        if (except_user_id) {
            users = this.usuarios.filter(user => user.id != except_user_id)
        }

        return users
    }

    async findById(id: string): Promise<import("../../typeorm/model/Usuario").default | undefined> {
        return this.usuarios.find(usuario => usuario.id === id)
    }
    async findByEmail(email: string): Promise<import("../../typeorm/model/Usuario").default | undefined> {
        return this.usuarios.find(usuario => usuario.email === email)
    }

    async create(data: ICreateUserDto): Promise<Usuario> {
        const usuario = new Usuario()
        Object.assign(usuario, { 
            id: uuid(), 
            email: data.email,
            nome: data.name,
            password: data.password
        })
        this.usuarios.push(usuario)

        return usuario
    }
    async save(user: import("../../typeorm/model/Usuario").default): Promise<import("../../typeorm/model/Usuario").default | undefined> {
        const index = this.usuarios.findIndex(findUser => findUser.id === user.id)
        this.usuarios[index] = user
        return user
    }

}