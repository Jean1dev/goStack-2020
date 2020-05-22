import { injectable, inject } from "tsyringe";
import { IAgendamentosRepository } from "../repositories/IAgendamentosRepository";
import Agendamento from "../typeorm/model/Agendamento";
import ICacheProvider from "@shared/container/providers/CacheProvider/ICacheProvider";
import { classToClass } from "class-transformer";

interface IRequest {
    provider_id: string
    month: number
    day: number
    year: number
}

@injectable()
export default class ListAgendamentosPrestador {

    constructor(
        @inject('AgendamentoRepository') private repository: IAgendamentosRepository,
        @inject('CacheProvider') private cache: ICacheProvider) {}

    public async execute({ provider_id, day, month, year }: IRequest): Promise<Agendamento[]> {
        const key = `provider-appointments:${provider_id}:${day}-${month}-${year}`
        let agendamentos = await this.cache.get<Agendamento[]>(key)

        if (!agendamentos) {
            agendamentos = await this.repository.findAllInDayFromProvider({
                day,
                month,
                year,
                provider_id
            })

            await this.cache.save(key, classToClass(agendamentos))
        }

        return agendamentos
    }
}