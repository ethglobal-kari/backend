import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Incentive } from 'src/entities/incentive.entity';
import { Proof } from 'src/entities/proof.entity';
import { WalletAddress } from 'src/entities/walletAddress.entity';
import { MerkleDto } from './incentive.dto';
import { parseBalanceMap } from './merkle/parse-balance-map';

@Injectable()
export class MerkleService {

    constructor(
        private readonly configService: ConfigService
    ) {

    }

    createProofs(
        incentiveId: string,
        walletAddresses: WalletAddress[],
        amount: number
    ): MerkleDto {
        // build json file
        const jsonList: Record<string, number> = {}
        walletAddresses.forEach(wallet => {
            jsonList[wallet.address] = amount
        })
        const merkleInfo = parseBalanceMap(jsonList)
        console.log(merkleInfo)

        let proofs: Partial<Proof>[] = []
        const addrs = Object.keys(merkleInfo.claims)
        addrs.forEach(addr => {
            const claim = merkleInfo.claims[addr]
            const proof: Partial<Proof> = {
                proofId: `${incentiveId}_${claim.index}`,
                incentiveId,
                proofIndex: claim.index,
                walletAddress: addr,
                amount,
                proofs: claim.proof
            }
            proofs.push(proof)
        })
        return {
            proofs,
            rootHash: merkleInfo.merkleRoot
        }
    }
}
