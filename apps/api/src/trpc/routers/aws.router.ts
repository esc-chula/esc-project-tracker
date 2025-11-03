import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc.service';
import { optional, z } from 'zod';
import { AwsService } from '../../aws/aws.service';

@Injectable()
export class AwsRouter {
  constructor(
    private readonly trpcService: TrpcService,
    private readonly awsService: AwsService,
  ) {}

  appRouter = this.trpcService.router({
    uploadFileToS3: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['AWS'], summary: 'Upload a file to AWS S3' } })
      .input(
        z.object({
          file: z.instanceof(Buffer),
          fileName: z.string(),
          folderName: optional(z.string()),
        }),
      )
      .mutation(({ input }) => {
        return this.awsService.uploadFileToS3(
          input.fileName,
          input.file,
          input.folderName,
        );
      }),

    getUrlToFile: this.trpcService.protectedProcedure
      .meta({ route: { tags: ['AWS'], summary: 'Get presigned URL to access a file in S3' } })
      .input(
        z.object({
          fileName: z.string(),
          folderName: optional(z.string()),
          isDownload: optional(z.boolean()),
        }),
      )
      .query(({ input }) => {
        return this.awsService.getUrlToFile(
          input.fileName,
          input.folderName,
          input.isDownload,
        );
      }),
  });
}
