import { ChevronDown } from 'lucide-react';

export default function RecentlyFiling() {
  return (
    <div className="w-[20%] flex justify-center items-center hover:cursor-pointer">
      ล่าสุด
      <ChevronDown size={20} className="ml-2" />
    </div>
  );
}
