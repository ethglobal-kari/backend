import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { Repository } from 'typeorm';
import { IncentiveService } from '../incentive/incentive.service';
import { CampaignCreateDto } from './campaign.dto';

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
        console.log(campaignCreateDto)
        const campaign = this.campaignRepository.create(campaignCreateDto)
        // await this.campaignRepository.save(campaign)
        if (campaignCreateDto.incentive) {
            await this.incentiveService.createIncentive(campaign, campaignCreateDto.incentive)
        }
    }

}
