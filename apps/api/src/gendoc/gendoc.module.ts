import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectModule } from '../project_/project_.module';
import { UserModule } from '../user_/user.module';
import { DocumentModule } from '../document_/document.module';
import { Gendoc } from '../entities/gendoc.entity';
import { GendocService } from './gendoc.service';
import { GendocController } from './gendoc.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Gendoc]),
    UserModule,
    ProjectModule,
    forwardRef(() => DocumentModule),
  ],
  providers: [GendocService],
  controllers: [GendocController],
  exports: [GendocService],
})
export class GendocModule {}
