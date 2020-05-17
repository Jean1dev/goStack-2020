import { injectable, inject } from "tsyringe";
import { IAgendamentosRepository } from "../repositories/IAgendamentosRepository";
import { getDaysInMonth, getDate } from "date-fns";

interface IRequest {
    provider_id: string
    month: number
    year: number
}

interface IResponse {
    day: number
    available: boolean
}

@injectable()
export default class ListMesesDiponiveisPeloProvedor {

    constructor(@inject('AgendamentoRepository') private repository: IAgendamentosRepository) {}

    public async execute({ provider_id, year, month }: IRequest): Promise<IResponse[]> {
        const agendamentos = await this.repository.findAllInMonthFromProvider({
            month,
            provider_id,
            year
        })

        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))
        const eachDay = Array.from({ length: numberOfDaysInMonth }, (_, index) => index + 1)
        const disponilibidade = eachDay.map(day => {
            const agendamentosNoDia = agendamentos.filter(agendamento => {
                return getDate(agendamento.date) === day
            })

            return {
                day,
                available: agendamentosNoDia.length < 10
            }
        })

        return disponilibidade
    }

}