import Link from 'next/link';

export default function LoginButton(): JSX.Element {
  return (
    <Link
      href={`https://account.intania.org/?appId=${process.env.INTANIA_AUTH_APP_ID}&callbackUrl=${process.env.INTANIA_AUTH_REDIRECT_URL}`}
    >
      <button className="px-4 py-2 border rounded-lg" type="button">
        Login with Intania Auth
      </button>
    </Link>
  );
}
