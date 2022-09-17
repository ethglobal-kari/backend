import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Audience } from 'src/entities/audience.entity'
import { Incentive } from 'src/entities/incentive.entity'
import { Proof } from 'src/entities/proof.entity'
import { WalletAddress } from 'src/entities/walletAddress.entity'
import { IncentiveController } from './incentive.controller'
import { IncentiveService } from './incentive.service'
import { MerkleService } from './merkle.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Incentive, Audience, WalletAddress, Proof])
    ],
    controllers: [IncentiveController],
    providers: [IncentiveService, MerkleService],
    exports: [IncentiveService, MerkleService]
})
export class IncentiveModule { }
