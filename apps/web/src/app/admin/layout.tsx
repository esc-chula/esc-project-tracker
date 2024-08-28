import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="flex">
        <Navbar isAdmin />
        {children}
        <Toaster />
      </div>
    </>
  );
}
