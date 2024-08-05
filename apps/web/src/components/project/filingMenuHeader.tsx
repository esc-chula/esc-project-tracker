export default function FilingMenuHeader() {
  return (
    <tr className="bg-rose-100">
      <th className="p-4 py-5 text-nowrap text-center w-[110px]">เลขรัน</th>
      <th className="p-4 py-5 text-nowrap text-start">ชื่อโครงการ</th>
      <th className="p-4 py-5 text-nowrap text-center w-[140px]">
        วันที่จองเลขรัน
      </th>
      <th className="p-4 py-5 text-nowrap text-center max-w-[160px]">
        รายละเอียดเอกสาร
      </th>
      <th className="p-4 py-5 text-nowrap text-center max-w-24 text-ellipsis whitespace-nowrap overflow-hidden">
        นิสิตผู้รับผิดชอบ
      </th>
      <th className="p-4 py-5 text-nowrap text-center w-[130px]">
        สถานะเอกสาร
      </th>
      <th className="p-4 py-5 text-nowrap text-center max-w-[150px]">
        หมายเหตุ
      </th>
      <th className="p-4 py-5 text-nowrap text-center w-[60px]"></th>
    </tr>
  );
}
