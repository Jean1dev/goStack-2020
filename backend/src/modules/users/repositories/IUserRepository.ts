import Usuario from "../typeorm/model/Usuario";
import ICreateUserDto from "../dtos/ICreateUserDto";

export default interface IUserRepository {
    findAllProviders(except_user_id?: string): Promise<Usuario[]>
    findById(id: string): Promise<Usuario | undefined>
    findByEmail(email: string): Promise<Usuario | undefined>
    create(data: ICreateUserDto): Promise<Usuario | undefined>
    save(user: Usuario): Promise<Usuario | undefined>
}