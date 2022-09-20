import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Audience } from 'src/entities/audience.entity';
import { Campaign } from 'src/entities/campaign.entity';
import { Incentive } from 'src/entities/incentive.entity';
import { WalletAddress } from 'src/entities/walletAddress.entity';
import { QueryBuilder, Repository } from 'typeorm';
import { IncentiveDto, IncentiveInfo } from './incentive.dto';
import { MerkleService } from './merkle.service';
import { v4 as uuidv4 } from 'uuid'
import { BigNumber, ethers } from 'ethers'
import * as FactoryArtifact from '../../../abis/DistributorFactory.json'
import * as DistributorArtifact from '../../../abis/IMerkleDistributor.json'
import { Proof } from 'src/entities/proof.entity';

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
        private readonly walletAddressRepository: Repository<WalletAddress>,
        @InjectRepository(Proof)
        private readonly proofRepository: Repository<Proof>,
    ) {

    }

    async createIncentive(incentiveDto: IncentiveDto, campaignId?: string): Promise<Partial<Incentive>> {
        // retrieve wallet address
        const addresses = await this.walletAddressRepository.createQueryBuilder('wa')
            .where('wa.audienceId = :audienceId', { audienceId: incentiveDto.audienceId })
            .getMany()
        // calculate proofs
        const { tokenAddress, totalAmount, audienceSize, chainId, audienceId } = incentiveDto
        const amount = Number(totalAmount) / audienceSize
        const incentiveId = uuidv4()
        const merkle = this.merkleService.createProofs(incentiveId, addresses, amount)
        // deploy contract
        const rpcUrl = this.configService.get<string>(`eth.network[${chainId}]`)
        const privateKey = this.configService.get<string>('eth.privateKey')
        const factoryAddress = this.configService.get<string>(`eth.factory[${chainId}]`)
        const provider = ethers.providers.getDefaultProvider(rpcUrl)
        const wallet = new ethers.Wallet(privateKey, provider)
        const factory = new ethers.Contract(factoryAddress, FactoryArtifact.abi, wallet)
        const tx = await factory.createDistributor(tokenAddress, merkle.rootHash, totalAmount, incentiveId)
        const response = await tx.wait()
        const contractAddress = response.events[0].args.distributor
        const txhash = response.events[0].transactionHash
        // get contract address & save to incentive
        const proofs = merkle.proofs.map(proof => this.proofRepository.create(proof))
        const incentive: Partial<Incentive> = {
            incentiveId,
            campaignId,
            audienceSize,
            totalAmount: Number(totalAmount),
            contractAddress,
            tokenAddress,
            rootHash: merkle.rootHash,
            txhash,
            chainId
        }
        await this.incentiveRepository.save(incentive)
        await this.proofRepository.save(proofs, { chunk: 1000 })
        return incentive
    }

    async getIncentive(incentiveId: string): Promise<IncentiveInfo> {
        const qb = this.incentiveRepository.createQueryBuilder('in')
            .where('in.incentiveId = :incentiveId', { incentiveId })
        const incentive = await qb.getOne()
        // find claimed
        const rpcUrl = this.configService.get<string>(`eth.network[${incentive.chainId}]`)
        const provider = ethers.providers.getDefaultProvider(rpcUrl)
        const distributor = new ethers.Contract(incentive.contractAddress, DistributorArtifact.abi, provider)
        const claimed: BigNumber = await distributor.claimed()
        const incentiveInfo: IncentiveInfo = {
            ...incentive,
            totalAmount: incentive.totalAmount.toString(),
            claimed: claimed.toNumber()
        }
        return incentiveInfo
    }

    async getProof(incentiveId: string, address: string): Promise<Proof> {
        const qb = this.proofRepository.createQueryBuilder('p')
            .where('p.incentiveId = :incentiveId', { incentiveId })
            .andWhere('p.walletAddress = :address', { address })
        const proof = await qb.getOne()
        return proof
    }
}
