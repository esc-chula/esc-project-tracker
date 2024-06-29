import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';

import { ProjectRouter } from './routers/project.router';
import { FilingRouter } from './routers/filing.router';
import { DocumentRouter } from './routers/document.router';
import { UserProjRouter } from './routers/user-proj.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly projectRouter: ProjectRouter,
    private readonly filingRouter: FilingRouter,
    private readonly documentRouter: DocumentRouter,
    private readonly userProjRouter: UserProjRouter,
  ) {}
  appRouter = this.trpc.router({
    project: this.projectRouter.appRouter,
    filing: this.filingRouter.appRouter,
    document: this.documentRouter.appRouter,
    userProj: this.userProjRouter.appRouter,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
