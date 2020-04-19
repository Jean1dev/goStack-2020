import { Router } from 'express'
import { BASE_PATH as agendamentosPath, agendamentosRouter } from './agendamentos.routes'
import { BASE_PATH as usuariosPath, usuariosRouter } from './usuarios.routes'
import { BASE_PATH as sessaoPath, sessaoRouter } from './sessao.routes'

const routes = Router()

routes.get('/health-status', (req, res) => { return res.json({ status: 'UP'} )})

routes.use(agendamentosPath, agendamentosRouter)

routes.use(usuariosPath, usuariosRouter)

routes.use(sessaoPath, sessaoRouter)

export default routes