import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const newAccessToken = request.headers.get('X-New-Access-Token');
  const newRefreshToken = request.headers.get('X-New-Refresh-Token');

  const response = new NextResponse('Cookies updated', { status: 200 });

  if (newAccessToken) {
    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
    });
  }

  if (newRefreshToken) {
    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: true,
    });
  }

  return response;
}
