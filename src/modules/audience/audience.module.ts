import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { WalletAddress } from 'src/entities/walletAddress.entity'
import { IncentiveModule } from '../incentive/incentive.module'
import { AudienceController } from './audience.controller'
import { AudienceService } from './audience.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([WalletAddress])
    ],
    controllers: [AudienceController],
    providers: [AudienceService],
})
export class AudienceModule { }
