import * as trpcExpress from '@trpc/server/adapters/express';
// import { decodeAndVerifyJwtToken } from './somewhere/in/your/app/utils';

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const accessToken: string = req.cookies['accessToken'];

  return accessToken ? { accessToken } : null;
}

export type Context = Awaited<ReturnType<typeof createContext>>;
