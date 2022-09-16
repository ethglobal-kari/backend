import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm'
import { Proof } from './proof.entity'

@Entity()
export class Incentive {
    @PrimaryColumn()
    incentiveId: string

    @Column()
    campaignId: string

    @Column({ nullable: true })
    description?: string

    @Column()
    audienceSize: number

    @Column()
    totalAmount: number

    @Column()
    contractAddress: string

    @Column()
    chainId: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => Proof, (proof) => proof.incentive, { onDelete: 'RESTRICT' })
    proofs: Proof[]
}