import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function Title({
  children,
  icon,
  href,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  href?: string;
}) {
  return (
    <>
      <div className="flex gap-4 font-bold text-intania text-3xl md:text-4xl lg:text-5xl">
        {href && (
          <Link href={href}>
            <ChevronLeft size={24} className="text-black mr-3" />
          </Link>
        )}
        {icon}
        {children}
      </div>
    </>
  );
}
