import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { optional, string, z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserService } from '../user_/user.service';
import { ProjectService } from '../project_/project_.service';
import { DocumentService } from '../document_/document.service';
import { FilingService } from '../filing/filing.service';
import { UserProjService } from '../user-proj/user-proj.service';
import { FilingStatus } from '../constant/enum';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userService: UserService,
    private readonly projectService: ProjectService,
    private readonly documentService: DocumentService,
    private readonly filingService: FilingService,
    private readonly userProjService: UserProjService,
  ) {}

  appRouter = this.trpc.router({
    hello: this.trpc.procedure
      .input(z.object({ name: z.string().optional() }))
      .query(({ input }) => {
        return `Hello ${input.name ? input.name : `World`}`;
      }),

    // Get Documents By UserID -> Document[]
    findDocumentsByUserId: this.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findByUserID(input.userId);
      }),

    // Get Documents By ProjectID -> Document[]
    findDocumentsByProjectId: this.trpc.procedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findByProjectID(input.projectId);
      }),

    // Get Projects By UserID -> Project[]
    findProjectsByUserId: this.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.projectService.findByUserID(input.userId);
      }),

    // Get Filings By UserID -> Filing[]
    findFilingsByUserId: this.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByUserID(input.userId);
      }),

    // Get Filings By ProjectID -> Filing[]
    findFilingsByProjectId: this.trpc.procedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.filingService.findByProjectID(input.projectId);
      }),

    getProjectByProjectId: this.trpc.procedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.projectService.findByProjectID(input.projectId);
      }),

    updateUserProjLastOpen: this.trpc.procedure
      .input(
        z.object({
          userId: z.string(),
          projectId: z.string(),
        }),
      )
      .query(({ input }) => {
        return this.userProjService.updateUserProjLastOpen({
          userId: input.userId,
          projectId: input.projectId,
        });
      }),

    // Create a new Filing
    createFiling: this.trpc.procedure
      .input(
        z.object({
          projectId: z.string(),
          filingName: z.string(),
          filingType: z.number(),
        }),
      )
      .query(({ input }) => {
        return this.filingService.createFiling(
          input.projectId,
          input.filingName,
          input.filingType,
        );
      }),

    //Update filing name

    updateFilingName: this.trpc.procedure
      .input(
        z.object({
          filingId: z.string(),
          filingName: z.string().optional(),
          FilingStatus: z
            .enum([
              FilingStatus.APPROVED,
              FilingStatus.DRAFT,
              FilingStatus.RETURNED,
              FilingStatus.WAIT_FOR_SECRETARY,
              FilingStatus.WAIT_FOR_STUDENT_AFFAIR,
            ])
            .optional(),
        }),
      )
      .query(({ input }) => {
        return this.filingService.updateFiling(input.filingId, {
          name: input.filingName,
          status: input.FilingStatus,
        });
      }),

    //Delete filing
    deleteFiling: this.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.filingService.deleteFiling(input.filingId);
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
