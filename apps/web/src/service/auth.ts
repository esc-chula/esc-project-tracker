'use server';

import { cookies } from 'next/headers';
import { trpc } from '../app/trpc';
import type { Payload, Tokens } from '../interface/auth';
import { User } from '../interface/user';
import { authErrors } from '../errors/auth';

export async function signIn(token: string): Promise<Tokens> {
  try {
    const data = await trpc.authRouter.signin.query({ token });

    const cookieStore = cookies();
    cookieStore.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: true,
    });
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: true,
    });

    return data;
  } catch (err) {
    console.error(err);
    throw new Error(authErrors.signInError);
  }
}

export async function validateToken(accessToken: string): Promise<Payload> {
  try {
    console.log('Validating token: ', accessToken);
    return await trpc.authRouter.validateToken.query({ accessToken });
  } catch (err) {
    console.error(err);
    throw new Error(authErrors.tokenInvalid);
  }
}

export async function signOut(): Promise<void> {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken')?.value;

    if (!accessTokenCookie) {
      throw new Error(authErrors.notAuthenticated);
    }

    const jwtPayload = await parseJwt(accessTokenCookie);

    await trpc.authRouter.signOut.query({ userId: jwtPayload.sub });

    cookieStore.delete('accessToken');
    cookieStore.delete('refreshToken');
  } catch (err) {
    console.error(err);
    throw new Error(authErrors.signOutError);
  }
}

export async function refershToken(): Promise<Tokens> {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken')?.value;
  const refreshTokenCookie = cookieStore.get('refreshToken')?.value;

  console.log('Expired access token: ', accessTokenCookie);
  console.log('Refreshing token with refresh token: ', refreshTokenCookie);

  if (!accessTokenCookie || !refreshTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  try {
    const jwtPayload = await parseJwt(accessTokenCookie);
    const newTokens = await trpc.authRouter.refreshToken.query({
      userId: jwtPayload.sub,
      refreshToken: refreshTokenCookie,
    });

    const response = await fetch('http://localhost:3000/api/set-cookies', {
      method: 'GET',
      headers: {
        'X-New-Access-Token': newTokens.accessToken,
        'X-New-Refresh-Token': newTokens.refreshToken,
      },
    });

    if (!response.ok) {
      console.error('Error updating cookies', response.statusText);
      throw new Error(authErrors.setCookiesError);
    }

    console.log('Successfully refreshed token');

    console.log('New Access Token: ', newTokens.accessToken);
    console.log('New Refresh Token: ', newTokens.refreshToken);

    return newTokens;
  } catch (err) {
    console.error(err);
    throw new Error(authErrors.refreshTokenError);
  }
}

export async function authenticate({
  accessToken,
  roles = [],
  tryRefresh = false,
}: {
  accessToken?: string;
  roles?: string[];
  tryRefresh?: boolean;
}): Promise<User> {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken')?.value;

  if (!accessTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  try {
    const userJwt = await validateToken(accessToken || accessTokenCookie);
    const user = await trpc.user.findUserByUserId.query({
      userId: userJwt.sub,
    });
    if (!user) {
      throw new Error(authErrors.userNotFound);
    }

    if (roles && roles.length > 0 && !roles.includes(user.role)) {
      throw new Error(authErrors.forbidden);
    }

    return user;
  } catch (err) {
    if (err instanceof Error && err.message === authErrors.tokenInvalid) {
      if (tryRefresh) {
        const newTokens = await refershToken().catch((err) => {
          console.error(err);
          throw err;
        });
        return authenticate({
          roles,
          tryRefresh: false,
          accessToken: newTokens.accessToken,
        });
      }
      throw new Error(authErrors.notAuthenticated);
    }
    console.error(err);
    throw err;
  }
}

export async function getUsername(): Promise<string> {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken')?.value;

  if (!accessTokenCookie) {
    return 'Guest';
  }

  const jwtPayload = await parseJwt(accessTokenCookie);
  return jwtPayload.username;
}

export async function getUserId(): Promise<string> {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken')?.value;

  if (!accessTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  const jwtPayload = await parseJwt(accessTokenCookie);
  return jwtPayload.sub;
}

export async function parseJwt(token: string): Promise<Payload> {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );

  return JSON.parse(jsonPayload);
}
