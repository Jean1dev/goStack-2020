import Agendamento from '../typeorm/model/Agendamento'
import { EntityRepository, Repository } from 'typeorm'

@EntityRepository(Agendamento)
class AgendamentoRepository extends Repository<Agendamento> {
    
    public async findByDate(date: Date): Promise<Agendamento | undefined> {
        return await this.findOne({
            where: { date }
        })
    }

}

export default AgendamentoRepository