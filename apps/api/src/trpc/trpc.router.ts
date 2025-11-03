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
import { createContext } from '../common/context/extractTokens';
import { GendocRouter } from './routers/gendoc.router';
import { toORPCRouter } from '@orpc/trpc';
import { OpenAPIGenerator } from '@orpc/openapi'
import {
  ZodToJsonSchemaConverter
} from '@orpc/zod' // <-- zod v3
import { apiReference } from '@scalar/nestjs-api-reference';

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
    private readonly gendocRouter: GendocRouter,
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
    gendoc: this.gendocRouter.appRouter,
  });

  orpcRouter = toORPCRouter(this.appRouter);

  private openAPIGenerator = new OpenAPIGenerator({
    schemaConverters: [
      new ZodToJsonSchemaConverter(), // For Zod schemas
    ],
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
        createContext,
      }),
    );

    app.use('/openapi.json', async (req, res) => {
      const spec = await this.openAPIGenerator.generate(this.orpcRouter, {
        info: {
          title: 'ESC Project Tracker API',
          version: '0.0.0',
          description: 'API documentation for ESC Project Tracker',
        },
        servers: [
          {
            url: process.env.NEXT_PUBLIC_API_SERVER_URL || 'http://localhost:4000',
            description: 'API Server',
          },
        ],
        tags: [
          { name: 'Authentication', description: 'Authentication and authorization endpoints' },
          { name: 'Projects', description: 'Project management operations' },
          { name: 'Filings', description: 'Filing system endpoints' },
          { name: 'Documents', description: 'Document management' },
          { name: 'Users', description: 'User management and profiles' },
          { name: 'Notifications', description: 'Notification system' },
          { name: 'AWS', description: 'AWS S3 file operations' },
          { name: 'Document Generation', description: 'Document generation from templates' },
        ],
      });
      res.json(spec);
    });

    app.use(
      '/reference',
      apiReference({
        url: '/openapi.json',
        theme: 'none',
      }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
