import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { CampaignService } from './campaign.service'

@Controller('campaign')
export class CampaignController {
    constructor(private readonly campaignService: CampaignService) {

    }


}