import { startOfHour } from 'date-fns'
import AgendamentoModel from '../model/Agendamento'
import AgendamentoRepository from '../repositories/Agendamento'
import { getCustomRepository } from 'typeorm'

interface RequestDto {
    date: Date
    provider: String
}

class CriarAgendamentoService {

    private repository: AgendamentoRepository

    constructor() {
        this.repository = getCustomRepository(AgendamentoRepository)
    }

    public async execute({ provider, date }: RequestDto): Promise<AgendamentoModel> {
        const dataDoAgendamento = startOfHour(date)

        const existeAgendamentoComMesmaData = await this.repository.findByDate(dataDoAgendamento)

        if (existeAgendamentoComMesmaData) {
            throw Error('Ja existe um agendamento pra esse dia')
        }

        return await this.repository.save(
            this.repository.create({ provider, date: dataDoAgendamento })
        )
    }
}

export default CriarAgendamentoService