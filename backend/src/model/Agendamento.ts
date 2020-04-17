import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity('agendamentos')
class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: String

    @Column()
    provider: String

    @Column('timestamp with time zone')
    date: Date
}

export default Agendamento