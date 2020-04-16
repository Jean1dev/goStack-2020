import { startOfHour } from 'date-fns'
import AgendamentoModel from '../model/Agendamento'
import AgendamentoRepository from '../repositories/Agendamento'
import { response } from 'express'

interface RequestDto {
    date: Date
    provider: String
}

class CriarAgendamentoService {

    private repository: AgendamentoRepository

    constructor(repository: AgendamentoRepository) {
        this.repository = repository
    }

    public execute({ provider, date} : RequestDto): AgendamentoModel {
        const dataDoAgendamento = startOfHour(date)

        const existeAgendamentoComMesmaData = this.repository.findByDate(dataDoAgendamento)

        if (existeAgendamentoComMesmaData) {
            throw Error('Ja existe um agendamento pra esse dia')
        }

        return this.repository.create({ provider, date: dataDoAgendamento })
    }
}

export default CriarAgendamentoService