import { Toaster } from '@/src/components/alert/toaster';
import Navbar from '@/src/components/navbar/navbar';

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex overflow-x-clip">
      <Navbar isAdmin />
      {children}
      <Toaster />
    </div>
  );
}
