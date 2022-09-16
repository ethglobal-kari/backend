import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToOne,
    JoinColumn
} from 'typeorm'
import { Audience } from './audience.entity'

@Entity()
export class WalletAddress {
    @PrimaryColumn()
    address: string

    @PrimaryColumn()
    audienceId: string

    @Column({ nullable: true })
    note?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Audience, (audience) => audience.walletAddresses, {
        onDelete: 'RESTRICT',
        cascade: false
    })
    @JoinColumn({ name: 'audienceId' })
    audience: Audience
}