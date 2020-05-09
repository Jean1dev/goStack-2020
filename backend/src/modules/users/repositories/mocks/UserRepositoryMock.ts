import IUserRepository from "../IUserRepository";
import Usuario from "@modules/users/typeorm/model/Usuario";
import ICreateUserDto from "@modules/users/dtos/ICreateUserDto";

export default class UserRepositoryMock implements IUserRepository {
    private usuarios: Usuario[] = []

    async findById(id: string): Promise<import("../../typeorm/model/Usuario").default | undefined> {
        return this.usuarios.find(usuario => usuario.id === id)
    }
    async findByEmail(email: string): Promise<import("../../typeorm/model/Usuario").default | undefined> {
        return this.usuarios.find(usuario => usuario.email === email)
    }

    async create(data: ICreateUserDto): Promise<Usuario> {
        const usuario = new Usuario()
        Object.assign(usuario, { 
            id: 'id', 
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