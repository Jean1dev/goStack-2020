import { Router } from 'express'
import AutenticacaoService from '../services/AutenticacaoService'

const BASE_PATH = '/sessao'
const sessaoRouter = Router()

sessaoRouter.post('/', async (req, res) => {
    const { email, password } = req.body

    const service = new AutenticacaoService()

    const { user, token } = await service.execute({ email, password })

    return res.json({ user, token })
})

export {
    sessaoRouter,
    BASE_PATH
}