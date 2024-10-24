import { redirect } from 'next/navigation';

export async function GET() {
  redirect(
    `https://account.intania.org/?appId=${process.env.INTANIA_AUTH_APP_ID}&callbackUrl=${process.env.INTANIA_AUTH_REDIRECT_URL}`,
  );
}
