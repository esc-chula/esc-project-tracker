import React from 'react';

export default function GenDocMockPage() {
  return (
    <div className="min-h-screen bg-neutral-100 text-neutral-900">
      {/* Shell */}
      <div className="mx-auto flex w-full max-w-[1200px] gap-5 p-4">
        {/* Sidebar */}
        <aside className="hidden w-[240px] shrink-0 rounded-2xl bg-[#5a0d0d] text-white lg:block">
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
              <a
                className="block rounded-lg px-3 py-2 hover:bg-white/10"
                href="/"
              >
                หน้าแรก
              </a>
              <a
                className="block rounded-lg px-3 py-2 hover:bg-white/10"
                href="/"
              >
                โครงการ
              </a>
              <a
                className="block rounded-lg px-3 py-2 hover:bg-white/10"
                href="/"
              >
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
              <a
                className="block rounded-lg px-3 py-2 hover:bg-white/10"
                href="/"
              >
                ถังขยะ
              </a>
              <a
                className="block rounded-lg px-3 py-2 hover:bg-white/10"
                href="/"
              >
                แจ้งปัญหา
              </a>
            </div>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1">
          <div className="rounded-2xl bg-white shadow-sm ring-1 ring-black/5">
            {/* Top bar / header */}
            <div className="flex items-center justify-between gap-3 border-b p-4">
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
                      3002-0003 ขอบขอับัดโครงการ
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

            {/* Content body */}
            <div className="space-y-6 p-4 md:p-6">
              {/* Step 1 */}
              <section className="rounded-xl border p-4 md:p-5">
                <header className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    ส่วนที่ 1 : ข้อมูลพื้นฐาน
                  </h2>
                  <span className="text-xs text-neutral-500">Step 1 / 3</span>
                </header>

                {/* Placeholder rows */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Placeholder label="ชื่อโครงการ (ภาษาอังกฤษ) *" />
                  <Placeholder label="ฝ่าย/ชมรมที่สังกัด (Optional)" />
                  <Placeholder label="วันเริ่มต้นกิจกรรม *" />
                  <Placeholder label="วันสิ้นสุดกิจกรรม *" />
                  <div className="md:col-span-2">
                    <Placeholder label="หลักการและเหตุผล *" tall />
                  </div>
                  <div className="md:col-span-2">
                    <Placeholder
                      label="วัตถุประสงค์ของโครงการ (แบบย่อ) *"
                      tall
                    />
                  </div>
                </div>
              </section>

              {/* Step 2 */}
              <section className="rounded-xl border p-4 md:p-5">
                <header className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    ส่วนที่ 2 : ข้อมูลเกี่ยวกับโครงการ
                  </h2>
                  <span className="text-xs text-neutral-500">Step 2 / 3</span>
                </header>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Placeholder label="วัตถุประสงค์ของโครงการ (ข้อย่อย)" />
                  <Placeholder label="ตัวชี้วัดความสำเร็จ" />
                  <div className="md:col-span-2">
                    <div className="rounded-lg border p-3">
                      <div className="mb-2 text-sm font-medium">
                        จำนวนผู้ที่คาดว่าจะเข้าร่วมโครงการ (Optional)
                      </div>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <ChipInput label="นิสิตชั้นปีที่ 1" />
                        <ChipInput label="นิสิตชั้นปีที่ 2" />
                        <ChipInput label="นิสิตชั้นปีที่ 3" />
                        <ChipInput label="นิสิตชั้นปีที่ 4" />
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Step 3 */}
              <section className="rounded-xl border p-4 md:p-5">
                <header className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-semibold">
                    ส่วนที่ 3 : เอกสารแนบ
                  </h2>
                  <span className="text-xs text-neutral-500">Step 3 / 3</span>
                </header>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <UploadBlock label="แนบไฟล์โครงการ (PDF)" />
                  <UploadBlock label="แนบแผนผัง/โปสเตอร์ (Optional)" />
                </div>

                <div className="mt-4 flex items-center justify-end gap-2">
                  <button className="rounded-lg border px-4 py-2 text-sm hover:bg-neutral-50">
                    บันทึกฉบับร่าง
                  </button>
                  <button className="rounded-lg bg-[#b51a1a] px-4 py-2 text-sm text-white hover:bg-[#9b1616]">
                    ส่งตรวจสอบ
                  </button>
                </div>
              </section>
            </div>
          </div>

          {/* Bottom spacing */}
          <div className="h-8" />
        </main>
      </div>
    </div>
  );
}

/** ---------- Small Presentational Helpers ---------- */

function Placeholder({ label, tall }: { label: string; tall?: boolean }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="mb-2 text-sm font-medium">{label}</div>
      <div className={`rounded-md bg-neutral-100 ${tall ? 'h-28' : 'h-10'}`} />
    </div>
  );
}

function ChipInput({ label }: { label: string }) {
  return (
    <div className="rounded-lg border p-3">
      <div className="mb-1 text-xs text-neutral-500">{label}</div>
      <div className="h-10 rounded-md bg-neutral-100" />
    </div>
  );
}

function UploadBlock({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border p-3">
      <div>
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-neutral-500">ลากไฟล์มาวางหรือลือกไฟล์</div>
      </div>
      <button className="rounded-lg border px-3 py-2 text-sm hover:bg-neutral-50">
        อัปโหลด
      </button>
    </div>
  );
}
