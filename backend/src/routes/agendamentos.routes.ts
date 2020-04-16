import { Router } from 'express'
import AgendamentoRepository from '../repositories/Agendamento'
import CriarAgendamentoService from '../services/CriarAgendamentoService'
import { parseISO } from 'date-fns'
const BASE_PATH = '/agendamentos'
const agendamentosRouter = Router()

const agendamentoRepository = new AgendamentoRepository()

agendamentosRouter.get('/', (req, res) => {
    return res.json(agendamentoRepository.findAll())
})

agendamentosRouter.post('/', (req, res) => {
    try {
        let { provider, date } = req.body
        if (!date) date = new Date()
        const parsedDate = parseISO(date)

        const a = new CriarAgendamentoService(agendamentoRepository)
            .execute({ provider, date: parsedDate })

        return res.json(a)
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

export {
    agendamentosRouter,
    BASE_PATH
}