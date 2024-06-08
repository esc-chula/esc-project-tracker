import {
  INestApplication,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { optional, string, z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { DocumentService } from '../document_/document.service';
import { FilingService } from '../filing/filing.service';
import { UserProjService } from '../user-proj/user-proj.service';
import { FilingStatus, ProjectType } from '../constant/enum';
import { CountFilingService } from '../count-filing/count-filing.service';
import { ProjectRouter } from './project.router';
import { FilingRouter } from './filing.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly projectRouter: ProjectRouter,
    private readonly filingRouter: FilingRouter,
  ) {}
  appRouter = this.trpc.router({
    project: this.projectRouter.appRouter,
    filing: this.filingRouter.appRouter,
  });

  async applyMiddleware(app: INestApplication) {
    this.appRouter = this.trpc.mergeRouters(
      this.appRouter,
      this.projectRouter.appRouter,
    );
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
