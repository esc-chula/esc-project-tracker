import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import * as trpcExpress from '@trpc/server/adapters/express';

import { ProjectRouter } from './routers/project.router';
import { FilingRouter } from './routers/filing.router';
import { DocumentRouter } from './routers/document.router';
import { UserProjRouter } from './routers/user-proj.router';
import { NotificationRouter } from './routers/notification.router';
import { UserRouter } from './routers/user.router';
import { UserFilingRouter } from './routers/user-filing.router';
import { AuthRouter } from './routers/auth.router';
import { AwsRouter } from './routers/aws.router';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly projectRouter: ProjectRouter,
    private readonly filingRouter: FilingRouter,
    private readonly documentRouter: DocumentRouter,
    private readonly userProjRouter: UserProjRouter,
    private readonly notificationRouter: NotificationRouter,
    private readonly userRouter: UserRouter,
    private readonly userFilingRouter: UserFilingRouter,
    private readonly authRouter: AuthRouter,
    private readonly awsRouter: AwsRouter,
  ) {}
  appRouter = this.trpc.router({
    project: this.projectRouter.appRouter,
    filing: this.filingRouter.appRouter,
    document: this.documentRouter.appRouter,
    userProj: this.userProjRouter.appRouter,
    notification: this.notificationRouter.appRouter,
    user: this.userRouter.appRouter,
    userFiling: this.userFilingRouter.appRouter,
    authRouter: this.authRouter.appRouter,
    aws: this.awsRouter.appRouter,
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
