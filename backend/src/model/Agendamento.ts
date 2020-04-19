import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import Usuario from './Usuario'

@Entity('agendamentos')
class Agendamento {

    @PrimaryGeneratedColumn('uuid')
    id: String

    @Column()
    provider_id: String

    @ManyToOne(() => Usuario)
    @JoinColumn({ name: 'provider_id' })
    provider: Usuario

    @Column('timestamp with time zone')
    date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Agendamento