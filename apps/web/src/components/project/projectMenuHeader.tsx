export default function ProjectMenuHeader({ isAdmin }: { isAdmin: boolean }) {
  return (
    <thead>
      <tr className="bg-rose-100">
        <th className="p-4 py-5 text-center text-nowrap">ลำดับ</th>
        <th className="p-4 py-5 text-center text-nowrap">รหัสโครงการ</th>
        <th className="p-4 py-5 text-start text-nowrap">ชื่อโครงการ</th>
        <th className="p-4 py-5 text-center text-nowrap">สถานะ</th>
        <th
          className={`${isAdmin ? 'px-10' : 'px-2 '} py-5 text-center text-nowrap`}
        ></th>
        {isAdmin ? null : (
          <th className="p-4 py-5 text-center text-nowrap">การเข้าร่วม</th>
        )}
      </tr>
    </thead>
  );
}
