import { Proof } from "src/entities/proof.entity"

export interface IncentiveDto {
    chainId: number
    tokenAddress: string
    audienceId: string
    audienceSize: number
    totalAmount: number
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