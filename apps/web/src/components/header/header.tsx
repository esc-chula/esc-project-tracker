import UserCard from './usercard';

export default function Header({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <header className="min-h-[50px] flex justify-between gap-3.5 pr-5">
        {children}
        <UserCard userName="นภันต์ โชติช่วงนภา" />
      </header>
    </>
  );
}
