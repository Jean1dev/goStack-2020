import IUserTokenRepository from "./IUserTokenRepository";
import UserToken from "../UserToken";
import { uuid } from 'uuidv4'

export default class UserTokenRepositoryMock implements IUserTokenRepository {
    private userTokens: UserToken[] = []

    public async findByToken(token: string): Promise<UserToken | undefined> {
        return this.userTokens.find(findToken => findToken.token === token)
    }


    public async generate(user_id: string): Promise<UserToken> {
        const userToken = new UserToken()

        Object.assign(userToken, {
            id: uuid(),
            token: uuid(),
            user_id
        })

        this.userTokens.push(userToken)
        return userToken
    }

}