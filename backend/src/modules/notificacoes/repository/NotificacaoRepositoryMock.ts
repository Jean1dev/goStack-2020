import INotificacaoRepository from "./INotificacaoRepository";
import ICreateNotificacaoDto from "../dto/ICreateNotificacaoDto";
import Notificacao from "../typeorm/schema/Notificacao";

export default class NotificacaoRepositoryMock implements INotificacaoRepository {

    public async create(data: ICreateNotificacaoDto): Promise<Notificacao> {
        return new Notificacao()
    }

}