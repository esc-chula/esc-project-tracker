import { Injectable } from '@nestjs/common';
import { initTRPC } from '@trpc/server';
import { Context } from '../common/context/getAccessToken';

@Injectable()
export class TrpcService {
  trpc = initTRPC.context<Context>().create();
  procedure = this.trpc.procedure;
  router = this.trpc.router;
  mergeRouters = this.trpc.mergeRouters;
}
