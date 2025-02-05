import { forwardRef, Module } from '@nestjs/common';
import { FilingService } from './filing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Filing } from '../entities/filing.entity';
import { FilingController } from './filing.controller';
import { ProjectModule } from '../project_/project_.module';
import { UserModule } from '../user_/user.module';
import { CountFilingModule } from '../count-filing/count-filing.module';
import { DocumentModule } from '../document_/document.module';
import { UserProjModule } from '../user-proj/user-proj.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Filing]),
    UserModule,
    CountFilingModule,
    ProjectModule,
    UserProjModule,
    forwardRef(() => DocumentModule),
  ],
  providers: [FilingService],
  controllers: [FilingController],
  exports: [FilingService],
})
export class FilingModule {}
