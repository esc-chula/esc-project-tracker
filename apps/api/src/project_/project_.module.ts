import { Module } from '@nestjs/common';
import { ProjectService } from './project_.service';
import { ProjectController } from './project_.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from '../entities/project.entity';
import { UserModule } from '../user_/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Project]), UserModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}
