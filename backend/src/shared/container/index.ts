import { container } from 'tsyringe'
import AgendamentoRepository from '@modules/agendamentos/repositories/AgendamentoRepository'
import { IAgendamentosRepository } from '@modules/agendamentos/repositories/IAgendamentosRepository'
import IUserRepository from '@modules/users/repositories/IUserRepository'
import UserRepository from '@modules/users/repositories/UserRepository'
import '@shared/providers/StorageProvider'

container.registerSingleton<IAgendamentosRepository>(
    'AgendamentoRepository', 
    AgendamentoRepository
)

container.registerSingleton<IUserRepository>(
    'UserRepository',
    UserRepository
)