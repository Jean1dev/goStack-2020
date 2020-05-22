import "reflect-metadata"
import ListDiasDisponiveisPrestador from "./ListDiasDisponiveisPrestador"
import MockAgendamentoRepository from "../repositories/mocks/MockAgendamentoRepository"

let service : ListDiasDisponiveisPrestador
let mockAgendamentosRepository: MockAgendamentoRepository
describe('ListDiasDisponiveisPrestador', () => {
    beforeEach(() => {
        mockAgendamentosRepository = new MockAgendamentoRepository()
        service = new ListDiasDisponiveisPrestador(mockAgendamentosRepository)
    })

    it('deve listar todos os dias disponiveis para o prestador', async () => {
        await mockAgendamentosRepository.create({
            date: new Date(2020, 4, 20, 8, 0, 0),
            provider_id: '1',
            user_id: '1'
        })

        await mockAgendamentosRepository.create({
            date: new Date(2020, 4, 20, 10, 0, 0),
            provider_id: '1',
            user_id: '1'
        })

        const disponiveis = await service.execute({ provider_id: '1', year: 2020, month: 5, day: 20 })
        expect(disponiveis).toEqual(expect.arrayContaining([
            { hour: 8, available: false},
            { hour: 9, available: false},
            { hour: 10, available: false},
            { hour: 11, available: false},
            { hour: 12, available: false},
            { hour: 13, available: false},
            { hour: 14, available: false},
            { hour: 15, available: false},
            { hour: 16, available: false},
            { hour: 17, available: false},
        ]))
    })

    it('deve listar todos os dias disponiveis para o prestador 2', async () => {
        await mockAgendamentosRepository.create({
            date: new Date(2020, 4, 20, 14, 0, 0),
            provider_id: '1',
            user_id: '1'
        })

        await mockAgendamentosRepository.create({
            date: new Date(2020, 4, 20, 15, 0, 0),
            provider_id: '1',
            user_id: '1'
        })

        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 20, 11).getTime()
        })

        const disponiveis = await service.execute({ provider_id: '1', year: 2020, month: 5, day: 20 })
        expect(disponiveis).toEqual(expect.arrayContaining([
            { hour: 8, available: false},
            { hour: 9, available: false},
            { hour: 10, available: false},
            { hour: 13, available: true},
            { hour: 14, available: false},
            { hour: 15, available: false},
            { hour: 16, available: true},
        ]))
    })
})