import { Router } from 'express'
import { BASE_PATH, agendamentosRouter } from './agendamentos.routes'

const routes = Router()

routes.get('/health-status', (req, res) => { return res.json({ status: 'UP'} )})

routes.use(BASE_PATH, agendamentosRouter)

export default routes