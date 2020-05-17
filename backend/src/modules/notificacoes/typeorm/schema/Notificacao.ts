import { ObjectID, Entity, CreateDateColumn, UpdateDateColumn, Column, ObjectIdColumn } from "typeorm";

@Entity('notificacoes')
export default class Notificacao {

    @ObjectIdColumn()
    id: ObjectID

    @Column()
    conteudo: string

    @Column('uuid')
    recipient_id: string

    @Column({ default: false })
    read: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}