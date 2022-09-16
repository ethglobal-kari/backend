import { IncentiveDto } from "../incentive/incentive.dto"

export interface CampaignCreateDto {
    subject: string
    audienceId: string
    content: string
    audienceVersion?: number
    incentive?: IncentiveDto
}