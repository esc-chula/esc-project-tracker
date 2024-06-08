import { Module } from '@nestjs/common';
import { CountFilingService } from './count-filing.service';
import { CountFilingController } from './count-filing.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CountFiling } from '../entities/countFiling.entity';
import { ProjectModule } from '../project_/project_.module';
import { TrpcModule } from '../trpc/trpc.module';

@Module({
  imports: [TypeOrmModule.forFeature([CountFiling]), ProjectModule, TrpcModule],
  providers: [CountFilingService],
  controllers: [CountFilingController],
  exports: [CountFilingService],
})
export class CountFilingModule {}
