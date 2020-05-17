import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity } from 'typeorm'
import { Exclude, Expose } from 'class-transformer'

@Entity('usuarios')
class Usuario extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    avatar: string

    @Column()
    @Exclude()
    password: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @Expose({ name: 'avatar_url' })
    get getAvatarUrl(): string {
        if (process.env.NODE_ENV === 'dev') {
            return this.avatar ? `${process.env.APP_URL}/files/${this.avatar}` : ''
        }
        return `${process.env.AWS_S3_URI}/${this.avatar}`
    }
}

export default Usuario