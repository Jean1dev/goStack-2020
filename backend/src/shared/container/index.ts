import { container } from 'tsyringe'
import AgendamentoRepository from '@modules/agendamentos/repositories/AgendamentoRepository'
import { IAgendamentosRepository } from '@modules/agendamentos/repositories/IAgendamentosRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/repositories/UserRepository'
import '@shared/container/providers'
import UserTokenRepository from '@modules/token/repositories/UserTokenRepository'
import IUserTokenRepository from '@modules/token/repositories/IUserTokenRepository'
import INotificacaoRepository from '@modules/notificacoes/repository/INotificacaoRepository'
import NotificacaoRepository from '@modules/notificacoes/repository/NotificacaoRepository'

container.registerSingleton<IAgendamentosRepository>(
    'AgendamentoRepository', 
    AgendamentoRepository
)

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
)

container.registerSingleton<IUserTokenRepository>(
    'UserTokenRepository',
    UserTokenRepository   
)

container.registerSingleton<INotificacaoRepository>(
    'NotificacaoRepository',
    NotificacaoRepository
)