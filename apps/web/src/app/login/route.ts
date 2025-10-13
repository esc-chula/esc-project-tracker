import { env } from 'next-runtime-env';
import { redirect } from 'next/navigation';

export async function GET() {
  if (env('DEV_MODE') === 'true') {
    redirect('/auth?token=dev-mock-token');
  }

  redirect(
    `https://account.intania.org/?appId=${env('INTANIA_AUTH_APP_ID')}&callbackUrl=${env('INTANIA_AUTH_REDIRECT_URL')}`,
  );
}
