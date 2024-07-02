import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { UserModule } from '../user_/user.module';
import { ProjectModule } from '../project_/project_.module';
import { TrpcModule } from '../trpc/trpc.module';
import { FilingModule } from '../filing/filing.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    UserModule,
    ProjectModule,
    FilingModule,
  ],
  providers: [DocumentService],
  controllers: [DocumentController],
  exports: [DocumentService],
})
export class DocumentModule {}
