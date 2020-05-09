import { startOfHour } from 'date-fns'
import AgendamentoModel from '../typeorm/model/Agendamento'
import AppError from '@shared/errors/AppError'
import { IAgendamentosRepository } from '../repositories/IAgendamentosRepository'
import { inject, injectable } from 'tsyringe'

interface RequestDto {
    date: Date
    provider_id: string
}

@injectable()
class CriarAgendamentoService {

    private repository: IAgendamentosRepository

    constructor(@inject('AgendamentoRepository') repository: IAgendamentosRepository) {
        this.repository = repository
    }

    public async execute({ provider_id, date }: RequestDto): Promise<AgendamentoModel> {
        const dataDoAgendamento = startOfHour(date)

        const existeAgendamentoComMesmaData = await this.repository.findByDate(dataDoAgendamento)

        if (existeAgendamentoComMesmaData) {
            throw new AppError('Ja existe um agendamento pra esse dia')
        }

        return await this.repository.create({ provider_id, date: dataDoAgendamento })
    }
}

export default CriarAgendamentoService