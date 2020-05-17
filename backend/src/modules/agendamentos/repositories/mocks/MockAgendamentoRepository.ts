import { IAgendamentosRepository } from '@modules/agendamentos/repositories/IAgendamentosRepository'
import ICreateAgendamentoDto from '@modules/agendamentos/dtos/ICreateAgendamentoDto'
import Agendamento from '@modules/agendamentos/typeorm/model/Agendamento'
import IFindAllInMonthFromProviderDto from '@modules/agendamentos/dtos/IFindAllInMonthFromProviderDto'
import { getMonth, getYear, getDate, isEqual } from 'date-fns'
import IFindAllInDayFromProviderDto from '@modules/agendamentos/dtos/IFindAllInDayFromProviderDto'

export default class MockAgendamentoRepository implements IAgendamentosRepository {
    
    private agendamentos: Agendamento[] = []

    public async findAllInDayFromProvider(data: IFindAllInDayFromProviderDto): Promise<Agendamento[]> {
        return this.agendamentos.filter(agendamento => (
            agendamento.provider_id === data.provider_id &&
                getMonth(agendamento.date) + 1 === data.month &&
                getYear(agendamento.date) === data.year &&
                getDate(agendamento.date) === data.day
        ))
    }

    public async findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDto): Promise<Agendamento[]> {
        return this.agendamentos.filter(agendamento => (
            agendamento.provider_id === data.provider_id &&
                getMonth(agendamento.date) + 1 === data.month &&
                getYear(agendamento.date) === data.year
        ))
    }
    
    public async create({ date, provider_id }: ICreateAgendamentoDto): Promise<Agendamento> {
        const agendamento = new Agendamento()
        Object.assign(agendamento, { id: 'id', date, provider_id })
        this.agendamentos.push(agendamento)
        return agendamento
    }
    
    public async findByDate(date: Date): Promise<Agendamento | undefined> {
        return this.agendamentos.find(agendamento => isEqual(agendamento.date, date))
    }
}