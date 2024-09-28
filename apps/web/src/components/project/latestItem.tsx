import { File } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LatestItem({
  projectId,
  projectCode,
  projectName,
  filingId,
  isAdmin = false,
}: {
  projectId: string;
  projectCode: string;
  projectName: string;
  filingId?: string;
  isAdmin?: boolean;
}) {
  const router = useRouter();
  return (
    <div
      className="bg-card text-card-foreground rounded-md flex flex-row py-1 px-8 space-x-5 border-2 border-black hover:cursor-pointer hover:scale-105 duration-200"
      onClick={() => {
        if (isAdmin) {
          router.push(`/admin/project/${projectId}/${filingId}`);
        } else router.push(`/project/${projectId}`);
      }}
    >
      <div className="flex items-center justify-center">
        <File size={30} strokeWidth={1} />
      </div>
      <div className="font-bold text-lg text-foreground">
        {projectCode}
        <div className="text-xs font-semibold text-ellipsis overflow-hidden whitespace-nowrap max-w-12">
          {projectName}
        </div>
      </div>
    </div>
  );
}
