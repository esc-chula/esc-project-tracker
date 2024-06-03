export default function ProjectMenuHeader() {
  return (
    <div className="w-full bg-rose-100 grid grid-cols-7 rounded-t-xl font-bold">
      <div className="flex items-center text-center justify-center p-5 px-8">
        ลำดับ
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        รหัสโครงการ
      </div>
      <div className="col-span-3 flex items-center text-center justify-start p-5 pl-12 px-8">
        ชื่อโครงการ
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        สถานะ
      </div>
      <div className="flex items-center text-center justify-center p-5 px-8">
        การเข้าร่วม
      </div>
    </div>
  );
}
