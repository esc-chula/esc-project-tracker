import { NextResponse, type NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { trpc } from './app/trpc';
import { parseJwt } from './service/auth';
import { Payload } from './interface/auth';

function redirect(req: NextRequest, payload: Payload): NextResponse {
  const path = req.nextUrl.pathname;
  if (path.startsWith('/admin/') && payload.role !== 'admin') {
    const nonAdminPath = path.replace(/(?<!\/admin\/)\/admin\//gm, '/');
    return NextResponse.redirect(new URL(nonAdminPath, req.url));
  }
  return NextResponse.next();
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  if (accessToken) {
    const verifyResult = await jwtVerify(
      accessToken,
      new TextEncoder().encode(process.env.JWT_SECRET),
    ).catch(() => {
      return null;
    });
    const verifiedPayload = verifyResult?.payload as Payload | undefined;
    // console.log(
    //   'accessToken expires: ',
    //   verifiedPayload?.exp
    //     ? new Date((verifiedPayload.exp + 7 * 60 * 60) * 1000)
    //     : null,
    // );

    if (verifiedPayload) return redirect(req, verifiedPayload);
  }

  const path = req.nextUrl.pathname;
  const refreshToken = req.cookies.get('refreshToken')?.value;

  if (!refreshToken)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${path}`, req.url),
    );

  const payload = await parseJwt(refreshToken);
  const newTokens = await trpc.authRouter.refreshToken
    .query({
      userId: payload.sub,
      refreshToken,
    })
    .catch(() => {
      console.error('Error refreshing new token');
      return null;
    });

  if (!newTokens)
    return NextResponse.redirect(
      new URL(`/login?callbackUrl=${path}`, req.url),
    );
  const newPayload = await parseJwt(newTokens.accessToken);
  const res = redirect(req, newPayload);
  res.cookies.set('accessToken', newTokens.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  res.cookies.set('refreshToken', newTokens.refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
  });
  return res;
}

export const config = {
  matcher: [
    '/home',
    '/projects',
    '/my-projects',
    '/status',
    '/project/:path*',
    '/new-project',
    '/admin/home',
    '/admin/projects',
    '/admin/status',
    '/admin/project/:path*',
    '/admin/new-project',
  ],
};
