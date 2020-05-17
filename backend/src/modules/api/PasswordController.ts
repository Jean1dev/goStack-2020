import { Controller, Body, OnUndefined, Post, UseBefore } from "routing-controllers";
import { container } from "tsyringe";
import RecuperarSenhaService from "@modules/users/services/RecuperarSenhaService";
import ResetarSenhaService from "@modules/users/services/ResetarSenhaService";
import EsqueciSenhaSpecification from "./specifications/EsqueciSenhaSpecification";
import ResetSenhaSpecification from "./specifications/ResetSenhaSpecification";

interface IRecuperarSenhaPaylod {
    email: string
}

interface IResetarSenhaPayload {
    password: string
    token: string
    password_confimation: string
}

@Controller('/password')
export default class PasswordController {

    @Post('/forgot')
    @UseBefore(EsqueciSenhaSpecification)
    @OnUndefined(204)
    public async recuperarSenha(@Body() data: IRecuperarSenhaPaylod): Promise<void> {
        const { email } = data

        const service = container.resolve(RecuperarSenhaService)
        await service.execute({ email })
    }

    @Post('/reset')
    @UseBefore(ResetSenhaSpecification)
    @OnUndefined(204)
    public async resetarSenha(@Body() data: IResetarSenhaPayload): Promise<void> {
        const { password, token } = data

        const service = container.resolve(ResetarSenhaService)
        await service.execute({ token, password })
    }
}