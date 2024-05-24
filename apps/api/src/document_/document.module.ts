import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../entities/Document.entity';
import { UserModule } from '../user_/user.module';
import { ProjectModule } from '../project_/project_.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), UserModule, ProjectModule],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
