import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IncentiveService {

    constructor(
        private readonly configService: ConfigService
    ) {

    }
}
