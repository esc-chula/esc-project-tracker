import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user_/user.module';
import { UserFiling } from '../entities/userFiling.entity';
import { FilingModule } from '../filing/filing.module';
import { UserFilingService } from './user-filing.service';
import { UserFilingController } from './user-filing.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserFiling]), UserModule, FilingModule],
  controllers: [UserFilingController],
  providers: [UserFilingService],
  exports: [UserFilingService],
})
export class UserFilingModule {}
