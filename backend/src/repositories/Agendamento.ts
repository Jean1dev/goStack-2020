import { isEqual } from 'date-fns'
import Model from '../model/Agendamento'

interface CreateAgendamentoDto {
    provider: String, 
    date: Date
}

class Agendamento {
    
    private agendamentos: Model[]

    constructor() {
        this.agendamentos = []
    }

    public create({ provider, date }: CreateAgendamentoDto): Model {
        const agendamento: Model = new Model({ provider, date })
        this.agendamentos.push(agendamento)

        return agendamento
    }

    public findByDate(date: Date): Model | undefined {
        return this.agendamentos.find(agendamento => isEqual(date, agendamento.date))
    }

    public findAll(): Model[] {
        return this.agendamentos
    }
}

export default Agendamento