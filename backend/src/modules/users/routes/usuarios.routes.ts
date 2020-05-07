import { Router } from 'express'
import CriarUsuarioService from '../services/CriarUsuarioService'
import authenticateMiddlware from '@shared/infra/http/middlewares/autenticacao'
import multer from 'multer'
import multerConfig from '@config/upload'
import UpdateUsuarioAvatarService from '../services/UpdateUsuarioAvatar'

const BASE_PATH = '/usuarios'
const usuariosRouter = Router()

const upload = multer(multerConfig)

usuariosRouter.post('/', async (req, res) => {
    const { name, email, password } = req.body

    const service = new CriarUsuarioService()
    const user = await service.execute({ name, email, password })
    delete user.password

    return res.json(user)

})

usuariosRouter.patch('/avatar', authenticateMiddlware, upload.single('avatar'), async (req, res) => {
    const service = new UpdateUsuarioAvatarService()
    const user = await service.execute({ user_id: req.user.id, avatarFileName: req.file.filename })

    return res.json(user)
})

export {
    usuariosRouter,
    BASE_PATH
}