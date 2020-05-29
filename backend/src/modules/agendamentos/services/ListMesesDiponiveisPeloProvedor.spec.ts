import "reflect-metadata"
import ListMesesDiponiveisPeloProvedor from "./ListMesesDiponiveisPeloProvedor"
import MockAgendamentoRepository from "../repositories/mocks/MockAgendamentoRepository"

let service: ListMesesDiponiveisPeloProvedor
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
            { "available": false, "day": 1 }, 
            { "available": false, "day": 2 }, 
            { "available": false, "day": 3 }, 
            { "available": false, "day": 4 }, 
            { "available": false, "day": 5 }, 
            { "available": false, "day": 6 }, 
            { "available": false, "day": 7 }, 
            { "available": false, "day": 8 }, 
            { "available": false, "day": 9 }, 
            { "available": false, "day": 10 }, 
            { "available": false, "day": 11 }, 
            { "available": false, "day": 12 }, 
            { "available": false, "day": 13 }, 
            { "available": false, "day": 14 }, 
            { "available": false, "day": 15 }, 
            { "available": false, "day": 16 }, 
            { "available": false, "day": 17 }, 
            { "available": false, "day": 18 }, 
            { "available": false, "day": 19 }, 
            { "available": false, "day": 20 }, 
            { "available": false, "day": 21 }, 
            { "available": false, "day": 22 }, 
            { "available": false, "day": 23 }, 
            { "available": false, "day": 24 }, 
            { "available": false, "day": 25 }, 
            { "available": false, "day": 26 }, 
            { "available": false, "day": 27 }, 
            { "available": true, "day": 28 }, 
            { "available": true, "day": 29 }, 
            { "available": true, "day": 30 }, 
            { "available": true, "day": 31 }
        ]))
    })
})