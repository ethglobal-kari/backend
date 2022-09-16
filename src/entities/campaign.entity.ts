import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity()
export class Campaign {
    @PrimaryGeneratedColumn("uuid")
    campaignId: string

    @Column()
    subject: string

    @Column()
    audienceId: string

    @Column({ nullable: true })
    audienceVersion?: number

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}