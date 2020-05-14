import IUserTokenRepository from "./IUserTokenRepository";
import UserToken from "../typeorm/model/UserToken";
import { Repository, getRepository } from "typeorm";

export default class UserTokenRepository implements IUserTokenRepository {
    private repository: Repository<UserToken>

    constructor() {
        this.repository = getRepository(UserToken)
    }

    public async generate(user_id: string): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id
        })

        await this.repository.save(userToken)
        return userToken
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        return await this.repository.findOne({
            where: { token }
        })
    }
}