import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { UserService } from '../user_/user.service';
import { UserModule } from '../user_/user.module';
import { ProjectModule } from '../project_/project_.module';
import { DocumentModule } from '../document_/document.module';
import { FilingModule } from '../filing/filing.module';
import { UserProjModule } from '../user-proj/user-proj.module';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    DocumentModule,
    FilingModule,
    UserProjModule,
  ],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
