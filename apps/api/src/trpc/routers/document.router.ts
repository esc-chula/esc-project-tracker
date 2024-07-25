import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';

import { optional, z } from 'zod';

import { DocumentService } from '../../document_/document.service';
import { DocumentActivity } from '../../constant/enum';

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

    // Create Document -> Document
    createDocument: this.trpcService.trpc.procedure
      .input(
        z.object({
          filingId: z.string(),
          name: z.string(),
          detail: optional(z.string()),
          pdfLink: z.string(),
          docLink: z.string(),
          activity: z.nativeEnum(DocumentActivity),
        }),
      )
      .mutation(async ({ input }) => {
        return await this.documentService.createDocument({
          filingId: input.filingId,
          name: input.name,
          detail: input.detail,
          pdfLink: input.pdfLink,
          docLink: input.docLink,
          activity: input.activity,
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
            detail: z.string().optional(),
            pdfLink: z.string().optional(),
            docLink: z.string().optional(),
          }),
        }),
      )
      .mutation(async ({ input }) => {
        const { docId, obj } = input;
        return this.documentService.updateDocument(docId, obj);
      }),
    // Delete Document -> Document
    deleteDocument: this.trpcService.trpc.procedure
      .input(z.object({ id: z.string() }))
      .mutation(({ input }) => {
        return this.documentService.deleteDocument(input.id);
      }),
  });
}
