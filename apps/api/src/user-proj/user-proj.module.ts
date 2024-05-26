import { Module } from '@nestjs/common';
import { UserProjController } from './user-proj.controller';
import { UserProjService } from './user-proj.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProj } from '../entities/userProj.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserProj])],
  controllers: [UserProjController],
  providers: [UserProjService],
  exports: [UserProjService],
})
export class UserProjModule {}
