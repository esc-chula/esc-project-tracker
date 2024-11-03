import Link from 'next/link';

// unused
export default function LoginButton(): JSX.Element {
  return (
    <Link href="/login">
      <button className="px-4 py-2 border rounded-lg" type="button">
        Login with Intania Auth
      </button>
    </Link>
  );
}
