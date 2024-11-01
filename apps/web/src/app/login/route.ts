import { env } from 'next-runtime-env';
import { redirect } from 'next/navigation';

export async function GET() {
  redirect(
    `https://account.intania.org/?appId=${env('INTANIA_AUTH_APP_ID')}&callbackUrl=${env('INTANIA_AUTH_REDIRECT_URL')}`,
  );
}
