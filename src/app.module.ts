import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { IncentiveModule } from './modules/incentive/incentive.module';
import { CampaignModule } from './modules/campaign/campaign.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [],
      isGlobal: true
    }),
    IncentiveModule,
    CampaignModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
