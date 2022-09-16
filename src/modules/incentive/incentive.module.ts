import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { IncentiveController } from './incentive.controller'
import { IncentiveService } from './incentive.service'

@Module({
    imports: [

    ],
    controllers: [IncentiveController],
    providers: [IncentiveService],
})
export class IncentiveModule { }
