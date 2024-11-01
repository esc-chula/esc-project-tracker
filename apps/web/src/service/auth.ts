'use server';

import { cookies } from 'next/headers';
import { trpc } from '../app/trpc';
import type { Payload, Tokens } from '../interface/auth';
import { authErrors } from '../errors/auth';

export async function getCookies(): Promise<Tokens> {
  try {
    const cookieStore = cookies();

    const accessToken = cookieStore.get('accessToken')?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!accessToken || !refreshToken) {
      throw new Error(authErrors.getCookiesError);
    }

    return {
      accessToken,
      refreshToken,
    };
  } catch (err) {
    console.error(err);
    throw new Error(authErrors.getCookiesError);
  }
}

export async function signIn(
  token: string,
): Promise<Tokens & { payload: Payload }> {
  // console.log(
  //   'Nextjs server-side, Signing in with token:',
  //   JSON.stringify({ token }),
  //   'destination:',
  //   process.env.NEXT_PUBLIC_API_SERVER_URL,
  //   'destination (env):',
  //   env('NEXT_PUBLIC_API_SERVER_URL'),
  // );

  const data = await trpc.authRouter.signin.mutate({ token }).catch(() => {
    throw new Error(authErrors.signInError);
  });
  const payload = await parseJwt(data.accessToken);

  const cookieStore = cookies();

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    domain: '.intania.org',
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    domain: '.intania.org',
  });

  return { ...data, payload };
}

export async function validateToken(accessToken: string): Promise<Payload> {
  return await trpc.authRouter.validateToken
    .query({ accessToken })
    .catch((err) => {
      console.error(err);
      throw new Error(authErrors.tokenInvalid);
    });
}

export async function signOut(): Promise<void> {
  const { accessToken: accessTokenCookie } = await getCookies().catch(() => {
    throw new Error(authErrors.getCookiesError);
  });

  if (!accessTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  await trpc.authRouter.signOut
    .query({ accessToken: accessTokenCookie })
    .catch((err) => {
      console.error(err);
      throw new Error(authErrors.signOutError);
    });

  const cookieStore = cookies();
  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}

export async function getUsername(): Promise<string> {
  const { accessToken: accessTokenCookie } = await getCookies();

  if (!accessTokenCookie) {
    return 'Guest';
  }

  const jwtPayload = await parseJwt(accessTokenCookie);
  return jwtPayload.username;
}

export async function getUserId(): Promise<string> {
  const { accessToken: accessTokenCookie } = await getCookies();

  if (!accessTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  const jwtPayload = await parseJwt(accessTokenCookie);
  return jwtPayload.sub;
}

export async function getJwtPayload(): Promise<Payload> {
  const { accessToken: accessTokenCookie } = await getCookies();

  if (!accessTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  const jwtPayload = await parseJwt(accessTokenCookie);
  return jwtPayload;
}

export async function parseJwt(token: string): Promise<Payload> {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    return JSON.parse(jsonPayload) as Payload;
  } catch (error) {
    console.error(error);
    throw new Error(authErrors.parsedJwtError);
  }
}
