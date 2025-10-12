import React from 'react';

export default function Sidebar() {
  return (
    <aside className="hidden w-[280px] shrink-0 rounded-2xl bg-gradient-to-b from-[#5a0d0d] to-[#4a0a0a] text-white lg:block h-full shadow-xl">
      <div className="p-6">
        {/* Brand */}
        <div className="mb-8 flex items-center gap-3 pb-6 border-b border-white/10">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-white/15 text-2xl font-bold shadow-lg backdrop-blur-sm">
            Σ
          </div>
          <div className="leading-tight">
            <div className="text-sm opacity-80 font-medium">กวศ.</div>
            <div className="text-xl font-bold tracking-wide">Document System</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-2 text-sm">
          <a 
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <span className="text-lg">🏠</span>
            <span className="font-medium">หน้าแรก</span>
          </a>
          <a 
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <span className="text-lg">📋</span>
            <span className="font-medium">โครงการ</span>
          </a>
          <a 
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <span className="text-lg">📄</span>
            <span className="font-medium">เอกสาร</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-xl bg-white/15 px-4 py-3 font-semibold shadow-lg backdrop-blur-sm border border-white/20"
            href="/"
          >
            <span className="text-lg">✨</span>
            <span>Gen Doc</span>
          </a>
        </nav>

        {/* Footer nav */}
        <div className="mt-12 space-y-2 border-t border-white/10 pt-6 text-sm opacity-90">
          <a 
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <span className="text-lg">🗑️</span>
            <span className="font-medium">ถังขยะ</span>
          </a>
          <a 
            className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <span className="text-lg">❓</span>
            <span className="font-medium">แจ้งปัญหา</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
