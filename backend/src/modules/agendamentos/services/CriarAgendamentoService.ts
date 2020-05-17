import { startOfHour, isBefore, getHours, format } from 'date-fns'
import Agendamento from '../typeorm/model/Agendamento'
import AppError from '@shared/errors/AppError'
import { IAgendamentosRepository } from '../repositories/IAgendamentosRepository'
import { inject, injectable } from 'tsyringe'
import INotificacaoRepository from '@modules/notificacoes/repository/INotificacaoRepository'
import ICacheProvider from '@shared/container/providers/CacheProvider/ICacheProvider'

interface RequestDto {
    date: Date
    provider_id: string
    user_id: string
}

@injectable()
class CriarAgendamentoService {

    constructor(
        @inject('AgendamentoRepository') private repository: IAgendamentosRepository,
        @inject('NotificacaoRepository') private notificacao: INotificacaoRepository,
        @inject('CacheProvider') private cache: ICacheProvider) {}

    public async execute({ provider_id, date, user_id }: RequestDto): Promise<Agendamento> {
        const dataDoAgendamento = startOfHour(date)
        
        if (isBefore(dataDoAgendamento, Date.now())) {
            throw new AppError('Data do agendamento anterior a data atual')
        }
        const existeAgendamentoComMesmaData = await this.repository.findByDate(dataDoAgendamento)
        
        if (existeAgendamentoComMesmaData) {
            throw new AppError('Ja existe um agendamento pra esse dia')
        }

        if (getHours(dataDoAgendamento) < 8 || getHours(dataDoAgendamento) > 19) {
            throw new AppError('Agendamentos sao permitidos apenas entre as 8h e 19h')
        }

        if (user_id === provider_id) {
            throw new AppError('Voce nao pode criar agendamento para si mesmo')
        }

        this.notificacao.create({ 
            recipient_id: provider_id, 
            content: `Novo Agendamento para dia ${format(dataDoAgendamento, "dd/MM/yyyy 'as' HH:mm")}` 
        })

        await this.cache.invalidate(`provider-appointments:${provider_id}:${format(dataDoAgendamento, 'd-M-yyyy')}`)
        return this.repository.create({ provider_id, date: dataDoAgendamento, user_id })
    }
}

export default CriarAgendamentoService