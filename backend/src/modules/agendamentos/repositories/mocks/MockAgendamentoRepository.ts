import { IAgendamentosRepository } from '@modules/agendamentos/repositories/IAgendamentosRepository'
import ICreateAgendamentoDto from '@modules/agendamentos/dtos/ICreateAgendamentoDto'
import Agendamento from '@modules/agendamentos/typeorm/model/Agendamento'

export default class MockAgendamentoRepository implements IAgendamentosRepository {

    private agendamentos: Agendamento[] = []
    
    public async create({ date, provider_id }: ICreateAgendamentoDto): Promise<Agendamento> {
        const agendamento = new Agendamento()
        Object.assign(agendamento, { id: 'id', date, provider_id })
        this.agendamentos.push(agendamento)
        return agendamento
    }
    
    public async findByDate(date: Date): Promise<Agendamento | undefined> {
        return this.agendamentos.find(agendamento => agendamento.date === date)
    }
}