import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

@Entity('usuarios')
class Usuario {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: String

    @Column()
    email: String

    @Column()
    avatar: string

    @Column()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}

export default Usuario