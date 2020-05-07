import { startOfHour } from 'date-fns'
import AgendamentoModel from '../typeorm/model/Agendamento'
import AgendamentoRepository from '@modules/agendamentos/repositoies/Agendamento'
import { getCustomRepository } from 'typeorm'
import AppError from '@shared/errors/AppError'

interface RequestDto {
    date: Date
    provider_id: String
}

class CriarAgendamentoService {

    private repository: AgendamentoRepository

    constructor() {
        this.repository = getCustomRepository(AgendamentoRepository)
    }

    public async execute({ provider_id, date }: RequestDto): Promise<AgendamentoModel> {
        const dataDoAgendamento = startOfHour(date)

        const existeAgendamentoComMesmaData = await this.repository.findByDate(dataDoAgendamento)

        if (existeAgendamentoComMesmaData) {
            throw new AppError('Ja existe um agendamento pra esse dia')
        }

        return await this.repository.save(
            this.repository.create({ provider_id, date: dataDoAgendamento })
        )
    }
}

export default CriarAgendamentoService