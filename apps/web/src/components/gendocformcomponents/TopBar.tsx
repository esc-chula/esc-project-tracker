import React from 'react';

export default function TopBar() {
  return (
    <div className="flex items-center justify-between gap-3 border-b p-4 h-15/100">
      {/* Breadcrumb + title */}
      <div className="min-w-0">
        <nav className="mb-1 text-sm text-neutral-500">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <a className="hover:underline" href="/">
                Gen Doc
              </a>
            </li>
            <li className="opacity-60">›</li>
            <li className="font-medium text-[#b51a1a]">
              3002-0003 ขออนุมัติโครงการ
            </li>
          </ol>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <h1 className="truncate text-xl font-semibold">
            3002-0003 ขออนุมัติโครงการ
          </h1>
          <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            เอกสารถูกบันทึกอัตโนมัติแล้ว
          </span>
        </div>

        <p className="mt-1 text-xs text-neutral-500">
          หมายเหตุ : กรอกข้อมูลให้ครบถ้วนก่อนจึงจะสามารถพิมพ์เอกสารได้
        </p>
      </div>

      {/* Actions + user */}
      <div className="flex items-center gap-2">
        <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">
          พิมพ์เอกสาร
        </button>
        <button
          className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50"
          title="Notifications"
        >
          🔔
        </button>
        <div className="flex items-center gap-2 rounded-lg border px-3 py-2">
          <div className="h-7 w-7 rounded-full bg-neutral-200" />
          <div className="hidden text-sm md:block">
            <div className="font-medium">สมชาย สายชล</div>
            <div className="text-xs text-neutral-500">ผู้ใช้ระบบ</div>
          </div>
          <span className="ml-1">▾</span>
        </div>
      </div>
    </div>
  );
}
