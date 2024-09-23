import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import Link from 'next/link';

export default function LandingPageHeader() {
  return (
    <>
      <header className="w-full flex h-20 justify-center items-center">
        <Image src="/icons/esc-red.svg" alt="logo" width={42} height={62} />
      </header>
    </>
  );
}
