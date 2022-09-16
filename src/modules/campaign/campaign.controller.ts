import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CampaignService } from './campaign.service'
import { CampaignCreateDto } from './campaign.dto'

@Controller('campaign')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {

    }

    @Post('/create')
    async createCampaign(@Body() campaignCreateDto: CampaignCreateDto): Promise<any> {
        await this.campaignService.createCampaign(campaignCreateDto)
    }
}