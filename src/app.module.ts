import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config'
import { IncentiveModule } from './modules/incentive/incentive.module';
import { CampaignModule } from './modules/campaign/campaign.module';
import { dbConfig } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import * as path from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [dbConfig],
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [path.join(__dirname, 'entities', '*.entity{.ts,.js}')],
        timezone: 'utc',
        synchronize: configService.get<boolean>('database.synchronize'),
        bigNumberStrings: false,
        logging: false,
        extra: {
          charset: 'utf8mb4_unicode_ci',
        },
      }),
    }),
    IncentiveModule,
    CampaignModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
