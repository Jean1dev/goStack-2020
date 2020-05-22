import CriarAgendamentoService from '@modules/agendamentos/services/CriarAgendamentoService'
import authenticationMiddleware from '@shared/infra/http/middlewares/autenticacao'
import { container } from 'tsyringe'
import { Controller, Post, Body, Get, UseBefore, Req, QueryParam } from 'routing-controllers'
import Agendamento from '../typeorm/model/Agendamento'
import { Request } from 'express'
import ListMesesDiponiveisPeloProvedor from '../services/ListMesesDiponiveisPeloProvedor'
import ListDiasDisponiveisPrestador from '../services/ListDiasDisponiveisPrestador'
import CriarAgendamentoSpecification from '../specifications/CriarAgendamentoSpecification'

interface CreateAgendamentoBody {
    provider_id: string
    date: Date
}

@Controller('/agendamentos')
@UseBefore(authenticationMiddleware)
export default class AgendamentosController {

    @Post()
    @UseBefore(CriarAgendamentoSpecification)
    public async createAgendamento(@Req() req: Request, @Body() data: CreateAgendamentoBody): Promise<Agendamento> {
        let { provider_id, date } = data
        if (!date) {
            date = new Date()
        } 

        const service = container.resolve(CriarAgendamentoService)
        return await service.execute({ provider_id, date, user_id: req.user.id })
    }

    @Get('/dias-disponiveis-mes')
    public async findAllDiaDisponiveisMes(
        @QueryParam("provider_id") provider_id: string,
        @QueryParam("month") month: number,
        @QueryParam("year") year: number): Promise<object> {

        return container.resolve(ListMesesDiponiveisPeloProvedor).execute({
            provider_id,
            month,
            year
        })
    }

    @Get('/horas-disponiveis-dia')
    public async findAllHorasDisponiveisDia(
        @QueryParam("provider_id") provider_id: string,
        @QueryParam("month") month: number,
        @QueryParam("year") year: number,
        @QueryParam("day") day: number): Promise<object> {

        return container.resolve(ListDiasDisponiveisPrestador).execute({
            provider_id,
            month,
            year,
            day
        })
    }
}
