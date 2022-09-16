import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Audience } from 'src/entities/audience.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { Incentive } from 'src/entities/incentive.entity';
import { WalletAddress } from 'src/entities/walletAddress.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { IncentiveDto } from './incentive.dto';
import { MerkleService } from './merkle.service';
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class IncentiveService {

    constructor(
        private readonly configService: ConfigService,
        private readonly merkleService: MerkleService,
        @InjectRepository(Incentive)
        private readonly incentiveRepository: Repository<Incentive>,
        @InjectRepository(Audience)
        private readonly audienceRepository: Repository<Audience>,
        @InjectRepository(WalletAddress)
        private readonly walletAddressRepository: Repository<WalletAddress>
    ) {

    }

    async createIncentive(campaign: Campaign, incentiveDto: IncentiveDto) {
        // retrieve wallet address
        const addresses = await this.walletAddressRepository.createQueryBuilder('wa')
            .where('wa.audienceId = :audienceId', { audienceId: campaign.audienceId })
            .getMany()
        // calculate proofs
        const amount = incentiveDto.totalAmount / incentiveDto.audienceSize
        const incentiveId = uuidv4()
        const merkle = this.merkleService.createProofs(incentiveId, addresses, amount)
        // deploy contract

        // get contract address & save to incentive
    }
}
