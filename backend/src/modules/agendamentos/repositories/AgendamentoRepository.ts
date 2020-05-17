import Agendamento from '../typeorm/model/Agendamento'
import { Repository, getRepository, Raw } from 'typeorm'
import { IAgendamentosRepository } from '@modules/agendamentos/repositories/IAgendamentosRepository'
import ICreateAgendamentoDto from '@modules/agendamentos/dtos/ICreateAgendamentoDto'
import IFindAllInMonthFromProviderDto from '../dtos/IFindAllInMonthFromProviderDto'
import IFindAllInDayFromProviderDto from '../dtos/IFindAllInDayFromProviderDto'

class AgendamentoRepository implements IAgendamentosRepository {
    private repository: Repository<Agendamento>

    constructor() {
        this.repository = getRepository(Agendamento)
    }
    public async findAllInDayFromProvider(data: IFindAllInDayFromProviderDto): Promise<Agendamento[]> {
        const { provider_id, year, month, day } = data
        const parsedMonth = String(month).padStart(2, '0')
        const parsedDay = String(day).padStart(2, '0')

        return this.repository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`
                ),
            }
        })
    }

    public async findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDto): Promise<Agendamento[]> {
        const { provider_id, year, month } = data
        const parsedMonth = String(month).padStart(2, '0')
        return this.repository.find({
            where: {
                provider_id,
                date: Raw(dateFieldName => 
                    `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`
                ),
            }
        })
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