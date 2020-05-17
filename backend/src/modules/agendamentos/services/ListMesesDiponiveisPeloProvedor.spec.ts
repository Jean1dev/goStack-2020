import "reflect-metadata"
import ListMesesDiponiveisPeloProvedor from "./ListMesesDiponiveisPeloProvedor"
import MockAgendamentoRepository from "../repositories/mocks/MockAgendamentoRepository"

let service : ListMesesDiponiveisPeloProvedor
let mockAgendamentosRepository: MockAgendamentoRepository

describe('ListMesesDiponiveisPeloProvedor', () => {
    beforeEach(() => {
        mockAgendamentosRepository = new MockAgendamentoRepository()
        service = new ListMesesDiponiveisPeloProvedor(mockAgendamentosRepository)
    })

    it('deve listar os meses disponiveis', async () => {
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

        await mockAgendamentosRepository.create({
            date: new Date(2020, 4, 21, 8, 0, 0),
            provider_id: '1',
            user_id: '1'
        })

        const disponiveis = await service.execute({ provider_id: '1', year: 2020, month: 5 })
        expect(disponiveis).toEqual(expect.arrayContaining([
            { day: 19, available: true},
            { day: 20, available: true},
            { day: 21, available: true},
            { day: 22, available: true}
        ]))
    })
})