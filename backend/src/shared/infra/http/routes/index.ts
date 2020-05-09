import { Router } from 'express'
import SessaoController from '@modules/users/routes/SessaoController'
import UsuarioController from '@modules/users/routes/UsuarioController'
import AgendamentosController from '@modules/agendamentos/routes/AgendamentosController'

const routes = Router()

routes.get('/health-status', (req, res) => { return res.json({ status: 'UP'} )})

function registerRoutes() {
    return [
        SessaoController,
        UsuarioController,
        AgendamentosController
    ]
}

export {
    routes, 
    registerRoutes
}