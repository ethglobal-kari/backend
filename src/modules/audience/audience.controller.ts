import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { WalletAddress } from "src/entities/walletAddress.entity";
import { AudienceService } from "./audience.service";

@Controller('audience')
export class AudienceController {
    constructor(private readonly audienceService: AudienceService) {

    }

    @Get(':audienceId')
    async createCampaign(@Param('audienceId') audienceId: string) {
        return await this.audienceService.getAudience(audienceId)
    }
}