import { HiLightBulb } from "react-icons/hi";
import { FileSearch } from "lucide-react";

export default function NoProject() {
  return (
    <div className="w-[50vw] flex flex-col items-center justify-center p-16">
      <div>
        <HiLightBulb size={120} style={{ color: "gray", opacity: 0.7 }} />
      </div>
      <div className="text-3xl text-gray-400 font-sukhumvit">
        ยังไม่มีโครงการ <br></br>เข้าร่วมได้เลย !
      </div>
      <div>
        <button className="bg-red text-foreground text-white px-4 py-2 rounded-lg mt-4">
          <FileSearch className="inline-block mr-3" />
          ค้นหาโครงการทั้งหมด
        </button>
      </div>
    </div>
  );
}
