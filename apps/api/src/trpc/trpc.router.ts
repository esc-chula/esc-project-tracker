import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
<<<<<<< HEAD
  constructor(private readonly trpc: TrpcService) {}
||||||| 72c7368
  constructor(
    private readonly trpc: TrpcService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly documentService: DocumentService,
    private readonly filingService: FilingService,
  ) {}
=======
  constructor(
    private readonly trpc: TrpcService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly documentService: DocumentService,
    private readonly filingService: FilingService,
  ) {}
  'test';
>>>>>>> origin/dev-backed-sprint-1

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : `World`}`;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
