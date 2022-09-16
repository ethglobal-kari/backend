import {
    Column,
    Entity,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    OneToMany
} from 'typeorm'
import { WalletAddress } from './walletAddress.entity'

@Entity()
export class Audience {
    @PrimaryColumn()
    audienceId: string

    @Column()
    name: string

    @Column()
    version?: number

    @Column({ nullable: true })
    description?: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => WalletAddress, (walletAddress) => walletAddress.audience, { onDelete: 'RESTRICT' })
    walletAddresses: WalletAddress[]
}