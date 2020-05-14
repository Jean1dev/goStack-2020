import { Router } from 'express'
import SessaoController from '@modules/users/routes/SessaoController'
import UsuarioController from '@modules/users/routes/UsuarioController'
import AgendamentosController from '@modules/agendamentos/routes/AgendamentosController'
import PasswordController from '@modules/api/PasswordController'

const routes = Router()

routes.get('/health-status', (req, res) => { return res.json({ status: 'UP'} )})

function registerRoutes() {
    return [
        SessaoController,
        UsuarioController,
        AgendamentosController,
        PasswordController
    ]
}

export {
    routes, 
    registerRoutes
}