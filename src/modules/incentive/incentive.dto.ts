import { Proof } from "src/entities/proof.entity"

export interface IncentiveDto {
    chainId: number
    tokenAddress: string
    audienceId: string
    audienceSize: number
    totalAmount: string
}

export interface IncentiveInfo {
    incentiveId: string
    campaignId?: string
    description?: string
    audienceSize: number
    claimed: number
    totalAmount: string
    contractAddress?: string
    tokenAddress: string
    rootHash: string
    txhash: string
    chainId: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
}

export interface MerkleDto {
    proofs: Partial<Proof>[]
    rootHash: string
}

export interface ClaimDto {
    contractAddress: string
    tokenAddress: string
    chainId: number
    index: number
    account: string
    amount: number
    proof: string[]
}