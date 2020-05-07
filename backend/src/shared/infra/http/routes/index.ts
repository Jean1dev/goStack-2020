import { Router } from 'express'
import { BASE_PATH as agendamentosPath, agendamentosRouter } from '@modules/agendamentos/routes/agendamentos.routes'
import { BASE_PATH as usuariosPath, usuariosRouter } from '@modules/users/routes/usuarios.routes'
import { BASE_PATH as sessaoPath, sessaoRouter } from '@modules/users/routes/sessao.routes'

const routes = Router()

routes.get('/health-status', (req, res) => { return res.json({ status: 'UP'} )})

routes.use(agendamentosPath, agendamentosRouter)

routes.use(usuariosPath, usuariosRouter)

routes.use(sessaoPath, sessaoRouter)

export default routes