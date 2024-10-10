import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';

import { optional, z } from 'zod';

import { DocumentService } from '../../document_/document.service';
import { DocumentActivity, DocumentStatus } from '../../constant/enum';
import { TRPCError } from '@trpc/server';

@Injectable()
export class DocumentRouter {
  constructor(
    private readonly documentService: DocumentService,
    private readonly trpcService: TrpcService,
  ) {}

  appRouter = this.trpcService.router({
    // Get Documents By UserID -> Document[]
    findDocumentsByUserId: this.trpcService.trpc.procedure
      .input(z.object({ userId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findByUserID(input.userId);
      }),
    // Get Documents By ProjectID -> Document[]
    findDocumentsByProjectId: this.trpcService.trpc.procedure
      .input(z.object({ projectId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findByProjectID(input.projectId);
      }),

    //get Documents by filingId
    findDocumentsByFilingId: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findDocumentsByFilingId(input.filingId);
      }),
    findLatestDocumentByFilingId: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string().uuid() }))
      .query(({ input }) => {
        return this.documentService.findLatestDocumentByFilingId(
          input.filingId,
        );
      }),
    findLatestReplyByFilingId: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findLatestReplyDocumentByFilingId(
          input.filingId,
        );
      }),

    findLatestPendingByFilingId: this.trpcService.trpc.procedure
      .input(z.object({ filingId: z.string() }))
      .query(({ input }) => {
        return this.documentService.findLatestPendingDocumentByFilingId(
          input.filingId,
        );
      }),

    // Create Document -> Document
    createDocument: this.trpcService.trpc.procedure
      .input(
        z.object({
          filingId: z.string(),
          name: z.string(),
          detail: optional(z.string()),
          pdfName: z.string(),
          docName: z.string(),
          activity: z.nativeEnum(DocumentActivity),
          userId: z.string(),
          status: optional(z.nativeEnum(DocumentStatus)),
          comment: optional(z.string()),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.documentService.createDocument({
          filingId: input.filingId,
          name: input.name,
          detail: input.detail,
          pdfName: input.pdfName,
          docName: input.docName,
          activity: input.activity,
          userId: input.userId,
          status: input.status,
          comment: input.comment,
        });
      }),

    //edit document
    updateDocument: this.trpcService.trpc.procedure
      .input(
        z.object({
          docId: z.string(),
          obj: z.object({
            name: z.string().optional(),
            activity: z.nativeEnum(DocumentActivity).optional(),
            status: z.nativeEnum(DocumentStatus).optional(),
            detail: z.string().optional(),
            comment: z.string().optional(),
            pdfName: z.string().optional(),
            docName: z.string().optional(),
          }),
        }),
      )
      .mutation(async ({ input }) => {
        const { docId, obj } = input;
        return this.documentService.updateDocument(docId, obj);
      }),
    // Delete Document -> Document
    deleteDocument: this.trpcService.protectedProcedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ input, ctx }) => {
        const { isMember } = await this.trpcService.isProjectMember(
          ctx.payload.sub,
          input.id,
          'document',
        );
        if (!isMember)
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'User is not a member of the project',
          });
        return this.documentService.deleteDocument(input.id);
      }),
    reviewSubmission: this.trpcService.trpc.procedure
      .input(z.object({ id: z.string().uuid(), updatedStatus: z.boolean() }))
      .mutation(({ input }) => {
        return this.documentService.reviewDocumentSubmission(
          input.id,
          input.updatedStatus,
        );
      }),
  });
}
