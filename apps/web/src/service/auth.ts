'use server';

import { cookies } from 'next/headers';
import { trpc } from '../app/trpc';
import type { Payload, Tokens } from '../interface/auth';

export async function signIn(token: string): Promise<Tokens> {
  try {
    const data = await trpc.authRouter.signin.query({ token });

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
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถเข้าสู่ระบบได้');
  }
}

export async function validateToken(accessToken: string): Promise<Payload> {
  try {
    return await trpc.authRouter.validateToken.query({ accessToken });
  } catch (err) {
    console.error(err);
    throw new Error('Token ไม่ถูกต้อง');
  }
}

export async function signOut(): Promise<void> {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken')?.value;

    if (!accessTokenCookie) {
      throw new Error('ผู้ใช้ไม่ได้เข้าสู่ระบบ');
    }

    const user = await validateToken(accessTokenCookie);

    await trpc.authRouter.signOut.query({ userId: user.sub });

    cookieStore.set('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });

    cookieStore.set('refreshToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: new Date(0),
    });
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถออกจากระบบได้');
  }
}

export async function refreshToken(): Promise<Tokens> {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken')?.value;
    const refreshTokenCookie = cookieStore.get('refreshToken')?.value;

    if (!accessTokenCookie || !refreshTokenCookie) {
      throw new Error('ผู้ใช้ไม่ได้เข้าสู่ระบบ');
    }

    const user = await validateToken(accessTokenCookie);

    const data = await trpc.authRouter.refreshToken.query({
      userId: user.sub,
      refreshToken: refreshTokenCookie,
    });

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
  } catch (err) {
    console.error(err);
    throw new Error('ไม่สามารถรีเฟรช Token ได้');
  }
}

export async function authenticate({
  roles,
}: {
  roles: string[];
}): Promise<Payload> {
  try {
    const cookieStore = cookies();
    const accessTokenCookie = cookieStore.get('accessToken')?.value;

    if (!accessTokenCookie) {
      throw new Error('ผู้ใช้ไม่ได้เข้าสู่ระบบ');
    }

    const user = await validateToken(accessTokenCookie);

    if (roles.length > 0 && !roles.includes(user.role)) {
      throw new Error('ไม่มีสิทธิ์เข้าถึง');
    }

    return user;
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      if (err.message === 'Token ไม่ถูกต้อง') {
        await refreshToken();
        return authenticate({ roles });
      }

      throw err;
    }

    throw new Error('ไม่มีสิทธิ์เข้าถึง');
  }
}

export async function getUserName(): Promise<String> {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken')?.value;

  if (!accessTokenCookie) {
    return 'Guest';
  }

  const user = await validateToken(accessTokenCookie);
  return user.username;
}

export async function getUserId(): Promise<string> {
  const cookieStore = cookies();
  const accessTokenCookie = cookieStore.get('accessToken')?.value;

  if (!accessTokenCookie) {
    throw new Error('ผู้ใช้ไม่ได้เข้าสู่ระบบ');
  }

  const user = await validateToken(accessTokenCookie);
  return user.sub;
}
