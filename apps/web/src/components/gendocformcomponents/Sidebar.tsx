import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden w-[240px] shrink-0 rounded-2xl bg-[#5a0d0d] text-white lg:block h-full">
      <div className="p-5">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10 text-2xl font-bold">
            Σ
          </div>
          <div className="leading-tight">
            <div className="text-sm opacity-80">กวศ.</div>
            <div className="text-lg font-semibold">Document System</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1 text-sm">
          <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/">
            หน้าแรก
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/">
            โครงการ
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/">
            เอกสาร
          </a>
          <a
            className="mt-2 block rounded-lg bg-white/10 px-3 py-2 font-medium"
            href="/"
          >
            Gen Doc
          </a>
        </nav>

        {/* Footer nav */}
        <div className="mt-10 space-y-1 border-t border-white/10 pt-4 text-sm opacity-90">
          <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/">
            ถังขยะ
          </a>
          <a className="block rounded-lg px-3 py-2 hover:bg-white/10" href="/">
            แจ้งปัญหา
          </a>
        </div>
      </div>
    </aside>
  );
}
