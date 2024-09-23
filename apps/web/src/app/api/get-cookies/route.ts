import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();

  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!accessToken || !refreshToken) {
    return new NextResponse('No cookies found', { status: 400 });
  }

  return new NextResponse(
    JSON.stringify({
      accessToken,
      refreshToken,
    }),
    { status: 200 },
  );
}
