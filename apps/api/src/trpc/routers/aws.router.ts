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
    uploadFileToS3: this.trpcService.trpc.procedure
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

    getUrlToFile: this.trpcService.trpc.procedure
      .input(
        z.object({ fileName: z.string(), folderName: optional(z.string()) }),
      )
      .query(({ input }) => {
        return this.awsService.getUrlToFile(input.fileName, input.folderName);
      }),
  });
}
