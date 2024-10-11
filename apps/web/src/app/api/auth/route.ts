import { cookies } from 'next/headers';
import { Payload } from '@/src/interface/auth';
import { trpc } from '../../../app/trpc';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { User } from '@/src/interface/user';
import { parseJwt } from '@/src/service/auth';

export const POST = async (req: NextRequest, res: NextResponse) => {
  const { accessToken, refreshToken, roles } = (await req.json()) as {
    accessToken: string;
    refreshToken: string;
    roles: string[];
  };
  const cookieStore = cookies();
  // set ได้จิงป่าว
  cookieStore.set('test', 'test', {
    httpOnly: true,
    secure: false,
    // sameSite: 'strict',
  });
  console.log('set cookie');

  if (!accessToken || !refreshToken) {
    return NextResponse.json(
      {
        error: 'Unauthorized, invalid token 1',
      },
      {
        status: 401,
      },
    );
  }

  const jwtPayload = await parseJwt(accessToken);

  if (roles && roles.length > 0 && !roles.includes(jwtPayload.role)) {
    return NextResponse.json(
      {
        error: 'Forbidden',
      },
      {
        status: 403,
      },
    );
  }

  let invalidToken = false;
  const userJwt = await trpc.authRouter.validateToken
    .query({ accessToken })
    .catch(() => {
      invalidToken = true;
    });
  let tokens: { accessToken: string; refreshToken: string };
  if (invalidToken || !userJwt) {
    console.log('Refreshing Token...');
    const newTokens = await trpc.authRouter.refreshToken
      .query({
        userId: jwtPayload.sub,
        refreshToken,
      })
      .catch(() => {
        console.error('Error refreshing new token');
        return null;
      });
    console.log('newTokens', newTokens);

    if (!newTokens) {
      return NextResponse.json(
        {
          error: 'Unauthorized, invalid token 2',
        },
        {
          status: 401,
        },
      );
    }
    console.log('after token 2');

    tokens = newTokens;
  } else {
    tokens = { accessToken, refreshToken };
  }
  console.log('token 3');

  await trpc.authRouter.validateToken
    .query({ accessToken: tokens.accessToken })
    .catch(() => {
      return NextResponse.json(
        {
          error: 'Unauthorized, invalid token 3',
        },
        {
          status: 401,
        },
      );
    });
  console.log('token 4');

  const user = await trpc.user.findUserByUserId
    .query({
      userId: jwtPayload.sub,
    })
    .catch(() => {
      return NextResponse.json(
        {
          error: 'User not found',
        },
        {
          status: 404,
        },
      );
    });

  // const cookieStore = cookies();
  // set ได้จิงป่าว
  cookieStore.set('accessToken', tokens.accessToken, {
    httpOnly: true,
    secure: false,
    // sameSite: 'strict',
  });

  cookieStore.set('refreshToken', tokens.refreshToken, {
    httpOnly: true,
    secure: false,
    // sameSite: 'strict',
  });
  cookieStore.set('refreshToken22', tokens.refreshToken, {
    httpOnly: true,
    secure: false,
    // sameSite: 'strict',
  });
  console.log('tokens', tokens);

  return NextResponse.json(user);
};

// function parseJwt(token: string): Payload {
//   const base64Url = token.split('.')[1];
//   const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//   const jsonPayload = decodeURIComponent(
//     atob(base64)
//       .split('')
//       .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
//       .join(''),
//   );

//   return JSON.parse(jsonPayload);
// }
