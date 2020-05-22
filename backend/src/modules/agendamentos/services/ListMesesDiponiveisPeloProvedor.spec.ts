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
            { "available": true, "day": 1 }, 
            { "available": true, "day": 2 }, 
            { "available": true, "day": 3 }, 
            { "available": true, "day": 4 }, 
            { "available": true, "day": 5 }, 
            { "available": true, "day": 6 }, 
            { "available": true, "day": 7 }, 
            { "available": true, "day": 8 }, 
            { "available": true, "day": 9 }, 
            { "available": true, "day": 10 }, 
            { "available": true, "day": 11 }, 
            { "available": true, "day": 12 }, 
            { "available": true, "day": 13 }, 
            { "available": true, "day": 14 }, 
            { "available": true, "day": 15 }, 
            { "available": true, "day": 16 }, 
            { "available": true, "day": 17 }, 
            { "available": true, "day": 18 }, 
            { "available": true, "day": 19 }, 
            { "available": true, "day": 20 }, 
            { "available": true, "day": 21 }, 
            { "available": false, "day": 22 }, 
            { "available": false, "day": 23 }, 
            { "available": false, "day": 24 }, 
            { "available": false, "day": 25 }, 
            { "available": false, "day": 26 }, 
            { "available": false, "day": 27 }, 
            { "available": false, "day": 28 }, 
            { "available": false, "day": 29 }, 
            { "available": false, "day": 30 }, 
            { "available": false, "day": 31 }
        ]))
    })
})