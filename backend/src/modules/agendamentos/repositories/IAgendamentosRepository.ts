import Agendamento from "../typeorm/model/Agendamento";
import ICreateAgendamentoDto from "../dtos/ICreateAgendamentoDto";
import IFindAllInMonthFromProviderDto from "../dtos/IFindAllInMonthFromProviderDto";
import IFindAllInDayFromProviderDto from "../dtos/IFindAllInDayFromProviderDto";

export interface IAgendamentosRepository {
    create(data: ICreateAgendamentoDto): Promise<Agendamento>
    findByDate(date: Date, provider_id: string): Promise<Agendamento | undefined>
    findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDto): Promise<Agendamento[]>
    findAllInDayFromProvider(data: IFindAllInDayFromProviderDto): Promise<Agendamento[]>
}