import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
} from 'typeorm'

@Entity()
export class Campaign {
    @PrimaryColumn()
    campaignId: string

    @Column()
    name: string

    @Column()
    content: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date
}