import { Module } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentController } from './document.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { UserModule } from '../user_/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document]), UserModule],
  providers: [DocumentService],
  controllers: [DocumentController],
})
export class DocumentModule {}
