import { Controller, Body, OnUndefined, Post } from "routing-controllers";
import { container } from "tsyringe";
import RecuperarSenhaService from "@modules/users/services/RecuperarSenhaService";
import ResetarSenhaService from "@modules/users/services/ResetarSenhaService";

interface IRecuperarSenhaPaylod {
    email: string
}

interface IResetarSenhaPayload {
    password: string
    token: string
}

@Controller('/password')
export default class PasswordController {

    @Post('/forgot')
    @OnUndefined(204)
    public async recuperarSenha(@Body() data: IRecuperarSenhaPaylod): Promise<void> {
        const { email } = data

        const service = container.resolve(RecuperarSenhaService)
        await service.execute({ email })
    }

    @Post('/reset')
    @OnUndefined(204)
    public async resetarSenha(@Body() data: IResetarSenhaPayload): Promise<void> {
        const { password, token } = data

        const service = container.resolve(ResetarSenhaService)
        await service.execute({ token, password })
    }
}