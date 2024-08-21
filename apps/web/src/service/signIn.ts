'use server';

import { cookies } from 'next/headers';
import { trpc } from '../app/trpc';
import type { Tokens } from '../interface/auth';

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
