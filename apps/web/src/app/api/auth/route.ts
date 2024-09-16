import axios from 'axios';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export const POST = async (req: NextRequest): Promise<NextResponse> => {
  const body = (await req.json()) as { token: string };

  try {
    const response = await axios.post(
      'https://accounts.intania.org/api/v1/auth/app/validate',
      {
        token: body.token,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.INTANIA_AUTH_SECRET}`,
        },
      },
    );

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
};
