import { injectable, inject } from "tsyringe";
import { IAgendamentosRepository } from "../repositories/IAgendamentosRepository";
import { getHours, isAfter } from "date-fns";

interface IRequest {
    provider_id: string
    month: number
    year: number
    day: number
}

interface IReponse {
    hour: number
    available: boolean
}

@injectable()
export default class ListDiasDisponiveisPrestador {

    constructor(@inject('AgendamentoRepository') private repository: IAgendamentosRepository) {}

    public async execute({ provider_id, month, year, day }: IRequest): Promise<IReponse[]> {
        const agendamentos = await this.repository.findAllInDayFromProvider(
            { provider_id, month, year, day})

        const hourStart = 8
        const eachOur = Array.from({ length: 10 }, (_, index) => index + hourStart)
        const disponiveis = eachOur.map(hour => {
            const temAgendamentoNoHorario = agendamentos.find(agendamento => 
                getHours(agendamento.date) === hour)

            const dataHoraAgora = new Date(Date.now())
            const dataAgendamento = new Date(year, month -1, day, hour)

            return {
                hour,
                available: !temAgendamentoNoHorario && isAfter(dataAgendamento, dataHoraAgora)
            }
        })
        return disponiveis
    }
}