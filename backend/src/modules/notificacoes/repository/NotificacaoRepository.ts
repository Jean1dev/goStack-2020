import { getMongoRepository, MongoRepository } from "typeorm";
import Notificacao from "../typeorm/schema/Notificacao";
import INotificacaoRepository from "./INotificacaoRepository";
import ICreateNotificacaoDto from "../dto/ICreateNotificacaoDto";

export default class NotificacaoRepository implements INotificacaoRepository {
    private repository: MongoRepository<Notificacao>

    constructor() {
        this.repository = getMongoRepository(Notificacao, 'mongo')
    }

    public async create(data: ICreateNotificacaoDto): Promise<Notificacao> {
        const notificacao = this.repository.create({
            conteudo: data.content,
            recipient_id: data.recipient_id
        })

        await this.repository.save(notificacao)
        return notificacao
    }
}