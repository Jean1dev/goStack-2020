import CriarAgendamentoService from '@modules/agendamentos/services/CriarAgendamentoService'
import { parseISO } from 'date-fns'
import authenticationMiddleware from '@shared/infra/http/middlewares/autenticacao'
import { container } from 'tsyringe'
import { Controller, Post, Body, Get, UseBefore } from 'routing-controllers'
import Agendamento from '../typeorm/model/Agendamento'

interface CreateAgendamentoBody {
    provider_id: string
    date: Date
}

@Controller('/agendamentos')
@UseBefore(authenticationMiddleware)
export default class AgendamentosController {

    @Post()
    public async createAgendamento(@Body() data: CreateAgendamentoBody): Promise<Agendamento> {
        let { provider_id, date } = data
        if (!date) {
            date = new Date()
        } 
        const parsedDate = parseISO(String(date))

        const service = container.resolve(CriarAgendamentoService)
        return await service.execute({ provider_id, date: parsedDate })
    }

    @Get()
    public async findAll() {
        // return res.json(await repository.find())    
    }

}
