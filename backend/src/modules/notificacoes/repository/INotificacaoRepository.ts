import ICreateNotificacaoDto from "../dto/ICreateNotificacaoDto";
import Notificacao from "../typeorm/schema/Notificacao";

export default interface INotificacaoRepository {
    create(data: ICreateNotificacaoDto): Promise<Notificacao>
}