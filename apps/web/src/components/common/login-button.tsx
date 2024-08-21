import Link from 'next/link';

export default function LoginButton(): JSX.Element {
  return (
    <Link
      href={`https://account.intania.org/?appId=${process.env.INTANIA_AUTH_APP_ID}&callbackUrl=http://localhost:3000/auth`}
    >
      <button className="px-4 py-2 border rounded-lg" type="button">
        Login with Intania Auth
      </button>
    </Link>
  );
}
