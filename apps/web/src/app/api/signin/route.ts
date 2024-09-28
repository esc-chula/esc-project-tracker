import { cookies } from 'next/headers';
import { trpc } from '../../../app/trpc';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const body = (await req.json()) as {
    token: string;
  };

  const { token } = body;

  const data = await trpc.authRouter.signin.query({ token }).catch((err) => {
    return null;
  });

  if (!data) {
    return NextResponse.json(
      {
        error: 'Unauthorized, invalid token',
      },
      {
        status: 401,
      },
    );
  }

  const cookieStore = cookies();

  cookieStore.set('accessToken', data.accessToken, {
    httpOnly: true,
    secure: true,
    // sameSite: 'strict',
  });

  cookieStore.set('refreshToken', data.refreshToken, {
    httpOnly: true,
    secure: true,
    // sameSite: 'strict',
  });

  return NextResponse.json({});
};
