import * as trpcExpress from '@trpc/server/adapters/express';

export async function createContext({
  req,
  res,
}: trpcExpress.CreateExpressContextOptions) {
  const accessToken: string | undefined = req.cookies['accessToken'];
  const refreshToken: string | undefined = req.cookies['refreshToken'];

  return { accessToken, refreshToken, res };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
