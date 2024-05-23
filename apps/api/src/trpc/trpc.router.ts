import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { string, z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { DocumentService } from '../document_/document.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly documentService: DocumentService,
  ) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : `World`}`;
      }),

    // // Get Documents By UserID -> Document[]
    // findDocumentsByUserId: this.trpc.procedure
    //   .input(z.object({ userId: z.string() }))
    //   .query(({ input }) => {
    //     return this.documentService.findByUserID(input.userId);
    //   }),

    // // Get Documents By ProjectID -> Document[]
    // findDocumentsByProjectId: this.trpc.procedure
    //   .input(z.object({ projectId: z.string() }))
    //   .query(({ input }) => {
    //     return this.documentService.findByProjectID(input.projectId);
    //   }),

    // // Get Projects By UserID -> Project[]
    // findProjectsByUserId: this.trpc.procedure
    //   .input(z.object({ userId: z.string() }))
    //   .query(({ input }) => {
    //     return this.projectService.findByUserID(input.userId);
    //   }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
