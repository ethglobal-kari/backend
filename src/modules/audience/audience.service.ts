import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WalletAddress } from 'src/entities/walletAddress.entity';
import { createPaginatedResponse } from 'src/pagination/pagination.util';

@Injectable()
export class AudienceService {

    constructor(
        private readonly configService: ConfigService,
        @InjectRepository(WalletAddress)
        private readonly walletAddressRepository: Repository<WalletAddress>
    ) {

    }

    async getAudience(audienceId: string, offset?: number) {
        const qb = this.walletAddressRepository.createQueryBuilder('wa')
            .where('wa.audienceId = :audienceId', { audienceId })
        qb.offset(offset ? offset : 0)
        qb.limit(100)
        const [walletAddresses, count] = await qb.getManyAndCount()
        return createPaginatedResponse(walletAddresses, count, 100, offset)
    }

}
