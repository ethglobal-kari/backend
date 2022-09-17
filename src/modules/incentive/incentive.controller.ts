import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { IncentiveService } from './incentive.service'

@Controller('incentive')
export class IncentiveController {
    constructor(private readonly incentiveService: IncentiveService) {

    }
}