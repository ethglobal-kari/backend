import { Proof } from "src/entities/proof.entity"

export interface IncentiveDto {
    chainId: number
    tokenAddress: string
    audienceSize: number
    totalAmount: number
}

export interface MerkleDto {
    proofs: Partial<Proof>[]
    rootHash: string
}