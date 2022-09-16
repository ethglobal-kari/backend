import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CampaignService {

    constructor(
        private readonly configService: ConfigService
    ) {

    }
}
