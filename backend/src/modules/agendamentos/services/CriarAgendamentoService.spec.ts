import MockAgendamentoRepository from "../repositories/mocks/MockAgendamentoRepository"
import CriarAgendamentoService from "./CriarAgendamentoService"
import AppError from "@shared/errors/AppError"
import NotificacaoRepositoryMock from "@modules/notificacoes/repository/NotificacaoRepositoryMock"
import MockRedisCacheProvider from "@shared/container/providers/CacheProvider/MockRedisCacheProvider"

let mock: MockAgendamentoRepository
let service: CriarAgendamentoService
let mockNotificacao: NotificacaoRepositoryMock
let mockCache: MockRedisCacheProvider

describe('CriarAgendamentoService', () => {
    beforeEach(() => {
        mockCache = new MockRedisCacheProvider()
        mock = new MockAgendamentoRepository()
        mockNotificacao = new NotificacaoRepositoryMock()
        service = new CriarAgendamentoService(mock, mockNotificacao, mockCache)
    })

    it('deve criar um agendamento', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 10, 12).getTime()
        })
        const agendamento = await service.execute({
            date: new Date(2020, 5, 10, 13),
            provider_id: '12',
            user_id: '1'
        })

        expect(agendamento).toHaveProperty('id')
        expect(agendamento.provider_id).toBe('12')
    })

    it('nao deve permitir criar 2 agendamentos no mesmo horario', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 10, 12).getTime()
        })

        const dataIgual = new Date(2020, 5, 10, 14)
        const agendamento = await service.execute({
            date: dataIgual,
            provider_id: '12',
            user_id: '1'
        })

        await expect(service.execute({
            date: dataIgual,
            provider_id: '12',
            user_id: '1'
        })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('nao deve permitir criar agendamento em data passada', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 10, 12).getTime()
        })

        await expect(service.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: '12',
            user_id: '1'
        })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('nao pode criar agendamento com provider_id e user_id iguails', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 10, 12).getTime()
        })

        await expect(service.execute({
            date: new Date(2020, 4, 10, 11),
            provider_id: '12',
            user_id: '12'
        })
        ).rejects.toBeInstanceOf(AppError)
    })

    it('nao deve permitir agendamentos antes das 8h e depois dash 19h', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 5, 10, 12).getTime()
        })

        await expect(service.execute({
            date: new Date(2020, 4, 10, 7),
            provider_id: '12',
            user_id: '1'
        })
        ).rejects.toBeInstanceOf(AppError)

        await expect(service.execute({
            date: new Date(2020, 4, 10, 20),
            provider_id: '12',
            user_id: '1'
        })
        ).rejects.toBeInstanceOf(AppError)
    })
})