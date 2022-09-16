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
import { Incentive } from './incentive.entity'

@Entity()
export class Proof {
    @PrimaryColumn()
    proofId: string // incentiveId_index

    @Column()
    incentiveId: string

    @Column()
    proofIndex: number

    @Column()
    walletAddress: string

    @Column()
    amount: number

    @Column('json', { nullable: false, default: '[]' })
    proofs: string[]

    @Column({ nullable: true })
    description?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Incentive, (incentive) => incentive.proofs, {
        onDelete: 'RESTRICT',
        cascade: false
    })
    @JoinColumn({ name: 'incentiveId' })
    incentive: Incentive
}