import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export function POST(request: NextRequest) {
  const newAccessToken = request.headers.get('X-New-Access-Token');
  const newRefreshToken = request.headers.get('X-New-Refresh-Token');

  if (!newAccessToken || !newRefreshToken) {
    return new NextResponse('There are no new tokens', { status: 400 });
  }

  const cookieStore = cookies();

  cookieStore.set('accessToken', newAccessToken);

  cookieStore.set('refreshToken', newRefreshToken);

  return new NextResponse('Cookies updated', { status: 200 });
}
