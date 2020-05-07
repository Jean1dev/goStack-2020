import { Router } from 'express'
import AgendamentoRepository from '@modules/agendamentos/repositoies/Agendamento'
import CriarAgendamentoService from '@modules/agendamentos/services/CriarAgendamentoService'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
import authenticationMiddleware from '@shared/infra/http/middlewares/autenticacao'

const BASE_PATH = '/agendamentos'
const agendamentosRouter = Router()

agendamentosRouter.use(authenticationMiddleware)

agendamentosRouter.get('/', async (req, res) => {
    const repository = getCustomRepository(AgendamentoRepository)
    return res.json(await repository.find())
})

agendamentosRouter.post('/', async (req, res) => {
    let { provider_id, date } = req.body
    if (!date) date = new Date()
    const parsedDate = parseISO(date)

    const service = new CriarAgendamentoService()

    return res.json(await service.execute({ provider_id, date: parsedDate }))
})

export {
    agendamentosRouter,
    BASE_PATH
}