import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IncentiveService } from './incentive.service'

@Controller('incentive')
export class IncentiveController {
    constructor(private readonly incentiveService: IncentiveService) {

    }

    // @Get('/create')
    // async createIncentive(): Promise<any> {
    //     await this.incentiveService.createIncentive()
    // }
}