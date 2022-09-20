import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IncentiveService } from './incentive.service'
import { Incentive } from 'src/entities/incentive.entity'
import { Proof } from 'src/entities/proof.entity'
import { ClaimDto, IncentiveDto, IncentiveInfo } from "./incentive.dto";

@Controller('incentive')
export class IncentiveController {
    constructor(private readonly incentiveService: IncentiveService) {

    }

    @Post('create')
    async createIncentive(@Body() incentiveDto: IncentiveDto): Promise<Partial<Incentive>> {
        const incentive = await this.incentiveService.createIncentive(incentiveDto)
        return incentive
    }

    @Get(':incentiveId')
    async getIncentive(@Param('incentiveId') incentiveId: string): Promise<IncentiveInfo> {
        return await this.incentiveService.getIncentive(incentiveId)
    }

    @Get(':incentiveId/claim/:address')
    async claimIncentive(@Param('incentiveId') incentiveId: string, @Param('address') address: string): Promise<ClaimDto> {
        const incentive = await this.incentiveService.getIncentive(incentiveId)
        const proof = await this.incentiveService.getProof(incentiveId, address)
        return {
            contractAddress: incentive.contractAddress,
            tokenAddress: incentive.tokenAddress,
            chainId: incentive.chainId,
            account: proof.walletAddress,
            index: proof.proofIndex,
            amount: proof.amount,
            proof: proof.proofs
        }
    }
}