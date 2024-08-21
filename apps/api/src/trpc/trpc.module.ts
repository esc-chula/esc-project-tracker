import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';

import { DocumentModule } from '../document_/document.module';
import { ProjectModule } from '../project_/project_.module';
import { FilingModule } from '../filing/filing.module';

import { ProjectRouter } from './routers/project.router';
import { FilingRouter } from './routers/filing.router';
import { DocumentRouter } from './routers/document.router';
import { UserProjModule } from '../user-proj/user-proj.module';
import { UserProjRouter } from './routers/user-proj.router';
import { NotificationModule } from '../notification/notification.module';
import { NotificationRouter } from './routers/notification.router';
import { UserModule } from '../user_/user.module';
import { UserRouter } from './routers/user.router';
import { UserFilingModule } from '../user-filing/user-filing.module';
import { UserFilingRouter } from './routers/user-filing.router';
import { AuthModule } from '../auth/auth.module';
import { AuthRouter } from './routers/auth.router';

@Module({
  imports: [
    ProjectModule,
    FilingModule,
    DocumentModule,
    FilingModule,
    UserProjModule,
    NotificationModule,
    UserModule,
    UserFilingModule,
    AuthModule,
  ],
  providers: [
    TrpcService,
    TrpcRouter,
    ProjectRouter,
    FilingRouter,
    DocumentRouter,
    UserProjRouter,
    NotificationRouter,
    UserRouter,
    UserFilingRouter,
    AuthRouter,
  ],
  controllers: [],
  exports: [TrpcService],
})
export class TrpcModule {}
