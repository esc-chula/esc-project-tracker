import { Module } from '@nestjs/common';
import { UserProjController } from './user-proj.controller';
import { UserProjService } from './user-proj.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProj } from '../entities/userProj.entity';
import { UserModule } from '../user_/user.module';
import { ProjectModule } from '../project_/project_.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserProj]), UserModule, ProjectModule],
  controllers: [UserProjController],
  providers: [UserProjService],
  exports: [UserProjService],
})
export class UserProjModule {}
