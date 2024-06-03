export default function FilingMenuHeader() {
  return (
    <div className="w-full rounded-t-xl bg-rose-100 grid grid-cols-9 gap-2 font-bold">
      <div className="flex items-center justify-center text-center py-5">
        เลขรัน
      </div>
      <div className="flex items-center justify-start text-center py-5 col-span-2">
        ชื่อโครงการ
      </div>
      <div className="flex items-center justify-center text-center py-5">
        วันที่จองเลขรัน
      </div>
      <div className="flex items-center justify-center text-center py-5">
        รายละเอียดเอกสาร
      </div>
      <div className="flex items-center justify-center text-center py-5">
        นิสิตผู้รับผิดชอบ
      </div>
      <div className="flex items-center justify-center text-center py-5">
        สถานะเอกสาร
      </div>
      <div className="flex items-center justify-center text-center py-5">
        หมายเหตุ
      </div>
      <div className="flex items-center justify-center text-center py-5"></div>
    </div>
  );
}
