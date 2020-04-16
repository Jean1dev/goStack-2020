import { uuid } from 'uuidv4'

class Agendamento {
    id: String
    provider: String
    date: Date

    constructor({ provider, date }: Omit<Agendamento, 'id'> ) {
        this.provider = provider
        this.date = date
        this.id = uuid()
    }
}

export default Agendamento