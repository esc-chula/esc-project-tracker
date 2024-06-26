import { Module } from '@nestjs/common';
import { FilingService } from './filing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filing } from '../entities/filing.entity';
import { FilingController } from './filing.controller';
import { ProjectModule } from '../project_/project_.module';
import { UserModule } from '../user_/user.module';
import { CountFilingModule } from '../count-filing/count-filing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Filing]),
    UserModule,
    CountFilingModule,
    ProjectModule,
  ],
  providers: [FilingService],
  controllers: [FilingController],
  exports: [FilingService],
})
export class FilingModule {}
