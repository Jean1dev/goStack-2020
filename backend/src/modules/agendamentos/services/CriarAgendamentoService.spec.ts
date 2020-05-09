import MockAgendamentoRepository from "../repositories/mocks/MockAgendamentoRepository"
import CriarAgendamentoService from "./CriarAgendamentoService"
import AppError from "@shared/errors/AppError"

describe('CriarAgendamentoService', () => {
    it('deve criar um agendamento', async () => {
        const mock = new MockAgendamentoRepository()
        const service = new CriarAgendamentoService(mock)

        const agendamento = await service.execute({
            date: new Date(),
            provider_id: '12'
        })

        expect(agendamento).toHaveProperty('id')
        expect(agendamento.provider_id).toBe('12')
    })

    it('nao deve permitir criar 2 agendamentos no mesmo horario', async () => {
        const mock = new MockAgendamentoRepository()
        const service = new CriarAgendamentoService(mock)

        const agendamento = await service.execute({
            date: new Date(),
            provider_id: '12'
        })

        expect(service.execute({
                date: new Date(),
                provider_id: '12'
            })
        ).rejects.toBeInstanceOf(AppError)
    })
})