import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { Repository } from 'typeorm';
import { IncentiveService } from '../incentive/incentive.service';
import { CampaignCreateDto } from './campaign.dto';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class CampaignService {

    constructor(
        private readonly configService: ConfigService,
        private readonly incentiveService: IncentiveService,
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>
    ) {

    }

    async createCampaign(campaignCreateDto: CampaignCreateDto) {
        const campaignId = uuidv4()
        let campaign = this.campaignRepository.create(campaignCreateDto)
        campaign.campaignId = campaignId
        await this.campaignRepository.save(campaign)
        if (campaignCreateDto.incentive) {
            await this.incentiveService.createIncentive(campaignCreateDto.incentive, campaign.campaignId)
        }
    }

}
