import { Request } from 'express'
import CriarUsuarioService from '../services/CriarUsuarioService'
import authenticateMiddlware from '@shared/infra/http/middlewares/autenticacao'
import multer from 'multer'
import multerConfig from '@config/upload'
import UpdateUsuarioAvatarService from '../services/UpdateUsuarioAvatar'
import { container } from 'tsyringe'
import { Controller, Post, Body, Patch, Req, UseBefore } from 'routing-controllers'
import Usuario from '../typeorm/model/Usuario'

const upload = multer(multerConfig)

interface CreateUserBody {
    name: string
    email: string
    password: string
}

@Controller('/usuarios')
export default class UsuarioController {

    @Post()
    public async createUser(@Body() data: CreateUserBody): Promise<Usuario | undefined> {
        const { name, email, password } = data

        const service = container.resolve(CriarUsuarioService)
        const user = await service.execute({ name, email, password })
        delete user?.password
        return user
    }

    @Patch('/avatar')
    @UseBefore(authenticateMiddlware, upload.single('avatar'))
    public async updateAvatar(@Req() req: Request): Promise<Usuario> {
        const service = container.resolve(UpdateUsuarioAvatarService)
        const user = await service.execute({ user_id: req.user.id, avatarFileName: req.file.filename })
        return user
    }

}