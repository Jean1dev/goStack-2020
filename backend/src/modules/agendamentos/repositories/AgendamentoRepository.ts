import Agendamento from '../typeorm/model/Agendamento'
import { Repository, getRepository } from 'typeorm'
import { IAgendamentosRepository } from '@modules/agendamentos/repositories/IAgendamentosRepository'
import ICreateAgendamentoDto from '@modules/agendamentos/dtos/ICreateAgendamentoDto'

class AgendamentoRepository implements IAgendamentosRepository {
    private repository: Repository<Agendamento>

    constructor() {
        this.repository = getRepository(Agendamento)
    }

    public async create({ date, provider_id }: ICreateAgendamentoDto): Promise<Agendamento> {
        const agendamento = this.repository.create({ provider_id, date })
        await this.repository.save(agendamento)
        return agendamento
    }
    
    public async findByDate(date: Date): Promise<Agendamento | undefined> {
        return await this.repository.findOne({
            where: { date }
        })
    }

}

export default AgendamentoRepository