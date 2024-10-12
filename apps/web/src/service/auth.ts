'use server';

import { cookies } from 'next/headers';
import { trpc } from '../app/trpc';
import type { Payload, Tokens } from '../interface/auth';
import type { User } from '../interface/user';
import { authErrors } from '../errors/auth';

export async function setCookies(
  accessToken: string,
  refreshToken: string,
): Promise<void> {
  try {
    const cookieStore = cookies();

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });

    cookieStore.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  } catch (err) {
    console.error(err);
    throw new Error(authErrors.setCookiesError);
  }
}

export async function getCookies(): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;
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

export async function signIn(token: string): Promise<Tokens> {
  const data = await trpc.authRouter.signin.query({ token }).catch((err) => {
    console.error(err);
    throw new Error(authErrors.signInError);
  });

  const cookieStore = cookies();

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });

  return data;
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
  const { accessToken: accessTokenCookie } = await getCookies().catch((err) => {
    console.error(err);
    throw new Error(authErrors.getCookiesError);
  });

  if (!accessTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  const jwtPayload = await parseJwt(accessTokenCookie);

  await trpc.authRouter.signOut
    .query({ userId: jwtPayload.sub })
    .catch((err) => {
      console.error(err);
      throw new Error(authErrors.signOutError);
    });

  await setCookies('', '').catch((err) => {
    console.error(err);
    throw new Error(authErrors.setCookiesError);
  });
}

export async function authenticate({
  roles = [],
}: {
  roles?: string[];
}): Promise<User> {
  const { accessToken: accessTokenCookie, refreshToken: refreshTokenCookie } =
    await getCookies().catch((err) => {
      console.error(err);
      throw new Error(authErrors.getCookiesError);
    });

  if (!accessTokenCookie || !refreshTokenCookie) {
    throw new Error(authErrors.notAuthenticated);
  }

  console.log('Validating existed token...', accessTokenCookie);

  let invalidToken = false;
  const userJwt = await validateToken(accessTokenCookie).catch(() => {
    invalidToken = true;
  });

  console.log(invalidToken, userJwt);

  let user: User;
  if (invalidToken || !userJwt) {
    console.log('Refreshing token...', refreshTokenCookie);

    const jwtPayload = await parseJwt(accessTokenCookie);
    const newTokens = await trpc.authRouter.refreshToken
      .query({
        userId: jwtPayload.sub,
        refreshToken: refreshTokenCookie,
      })
      .catch((err) => {
        console.error(err);
        throw new Error(authErrors.refreshTokenError);
      });

    await setCookies(newTokens.accessToken, newTokens.refreshToken).catch(
      (err) => {
        console.error(err);
        throw new Error(authErrors.setCookiesError);
      },
    );

    console.log('Validating new token...', newTokens.accessToken);

    const newJwtPayload = await validateToken(newTokens.accessToken).catch(
      (err) => {
        console.error(err);
        throw new Error(authErrors.tokenInvalid);
      },
    );
    const foundedUser = await trpc.user.findUserByUserId
      .query({
        userId: newJwtPayload.sub,
      })
      .catch((err) => {
        console.error(err);
        throw new Error(authErrors.userNotFound);
      });
    if (!foundedUser) {
      throw new Error(authErrors.userNotFound);
    }

    user = foundedUser;
  } else {
    const foundedUser = await trpc.user.findUserByUserId
      .query({
        userId: userJwt.sub,
      })
      .catch((err) => {
        console.error(err);
        throw new Error(authErrors.userNotFound);
      });
    if (!foundedUser) {
      throw new Error(authErrors.userNotFound);
    }

    user = foundedUser;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    throw new Error(authErrors.forbidden);
  }

  return user;
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
