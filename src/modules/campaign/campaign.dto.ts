export interface CampaignCreateDto {
    subject: string
    audienceId: string
    content: string
    incentive?: IncentiveDto
}

export interface IncentiveDto {
    chainId: string
    tokenAddress: string
    audienceSize: number
    totalAmount: number
}