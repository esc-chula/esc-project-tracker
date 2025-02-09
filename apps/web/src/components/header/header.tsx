import UserCard from './user-card';

export default function Header({
  children,
  username,
}: {
  children?: React.ReactNode;
  username?: string;
}) {
  return (
    <header className="min-h-[50px] flex justify-between gap-3.5">
      {children}
      <UserCard usernameData={username} />
    </header>
  );
}
