import { Module } from '@nestjs/common';
import { TrpcRouter } from './trpc.router';
import { TrpcService } from './trpc.service';
import { UserService } from '../user_/user.service';
import { UserModule } from '../user_/user.module';
import { ProjectModule } from '../project_/project_.module';
import { DocumentModule } from '../document_/document.module';

@Module({
  imports: [UserModule, ProjectModule, DocumentModule],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
