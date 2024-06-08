import { Module, forwardRef } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { UserService } from '../user_/user.service';
import { UserModule } from '../user_/user.module';
import { ProjectModule } from '../project_/project_.module';
import { DocumentModule } from '../document_/document.module';
import { FilingModule } from '../filing/filing.module';
import { UserProjModule } from '../user-proj/user-proj.module';
import { CountFilingModule } from '../count-filing/count-filing.module';
import { ProjectRouter } from './project.router';

@Module({
  imports: [ProjectModule],
  providers: [TrpcService, TrpcRouter, ProjectRouter],
  controllers: [],
  exports: [TrpcService],
})
export class TrpcModule {}
