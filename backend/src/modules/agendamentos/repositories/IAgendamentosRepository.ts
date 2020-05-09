import Agendamento from "../typeorm/model/Agendamento";
import ICreateAgendamentoDto from "../dtos/ICreateAgendamentoDto";

export interface IAgendamentosRepository {
    create(data: ICreateAgendamentoDto): Promise<Agendamento>
    findByDate(date: Date): Promise<Agendamento | undefined>
}