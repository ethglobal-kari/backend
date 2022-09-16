import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Campaign } from 'src/entities/campaign.entity';
import { Repository } from 'typeorm';
import { CampaignCreateDto } from './campaign.dto';

@Injectable()
export class CampaignService {

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(Campaign)
        private readonly campaignRepository: Repository<Campaign>
    ) {

    }

    async createCampaign(campaignCreateDto: CampaignCreateDto) {
        console.log(campaignCreateDto)
        const campaign = this.campaignRepository.create(campaignCreateDto)
        await this.campaignRepository.save(campaign)
    }

}
