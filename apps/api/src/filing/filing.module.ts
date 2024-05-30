import { Module } from '@nestjs/common';
import { FilingService } from './filing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filing } from '../entities/filing.entity';
import { FilingController } from './filing.controller';
import { ProjectModule } from '../project_/project_.module';
import { UserModule } from '../user_/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Filing]), ProjectModule, UserModule],
  providers: [FilingService],
  controllers: [FilingController],
  exports: [FilingService],
})
export class FilingModule {}
