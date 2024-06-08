import { Module, forwardRef } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';

import { DocumentModule } from '../document_/document.module';
import { ProjectModule } from '../project_/project_.module';
import { FilingModule } from '../filing/filing.module';

import { ProjectRouter } from './project.router';
import { FilingRouter } from './filing.router';
import { DocumentRouter } from './document.router';
import { UserProjModule } from '../user-proj/user-proj.module';
import { UserProjRouter } from './user-proj.router';

@Module({
  imports: [
    ProjectModule,
    FilingModule,
    /*DocumentModule,
    FilingModule,
    UserProjModule,*/
  ],
  providers: [
    TrpcService,
    TrpcRouter,
    ProjectRouter,
    FilingRouter,
    /*DocumentRouter,
    UserProjRouter,*/
  ],
  controllers: [],
  exports: [TrpcService],
})
export class TrpcModule {}
