import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Campaign } from 'src/entities/campaign.entity'
import { CampaignController } from './campaign.controller'
import { CampaignService } from './campaign.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Campaign])
    ],
    controllers: [CampaignController],
    providers: [CampaignService],
})
export class CampaignModule { }
