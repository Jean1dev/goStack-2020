import { Router } from 'express'
import AgendamentoRepository from '../repositories/Agendamento'
import CriarAgendamentoService from '../services/CriarAgendamentoService'
import { parseISO } from 'date-fns'
import { getCustomRepository } from 'typeorm'
const BASE_PATH = '/agendamentos'
const agendamentosRouter = Router()

agendamentosRouter.get('/', async (req, res) => {
    const repository = getCustomRepository(AgendamentoRepository)
    return res.json(await repository.find())
})

agendamentosRouter.post('/', async (req, res) => {
    try {
        let { provider, date } = req.body
        if (!date) date = new Date()
        const parsedDate = parseISO(date)

        const service = new CriarAgendamentoService()
            
        return res.json(await service.execute({ provider, date: parsedDate }))
    } catch (error) {
        return res.status(400).json({ error: error.message })
    }
})

export {
    agendamentosRouter,
    BASE_PATH
}