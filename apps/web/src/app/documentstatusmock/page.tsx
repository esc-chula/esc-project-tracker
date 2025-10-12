import DocumentStatus from '@/src/components/gendocformcomponents/DocumentStatus';
import Sidebar from '@/src/components/gendocformcomponents/Sidebar';
import TopBar from '@/src/components/gendocformcomponents/TopBar';

export default function DocumentStatusMockPage() {
  return (
    <div className="h-screen bg-neutral-100 text-neutral-900 flex">
      <div className="flex w-full max-w-[1200px] mx-auto gap-5 p-4 h-full">
        <Sidebar />

        <main className="flex-1 h-full flex flex-col">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5 h-full flex flex-col">
            <TopBar />
            <DocumentStatus statusNumber={3} subStatus="PROCESS" />
          </div>
        </main>
      </div>
    </div>
  );
}
