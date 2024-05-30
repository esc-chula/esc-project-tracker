import { HiLightBulb } from "react-icons/hi";
import { FilePlus } from "lucide-react";
import AddNewProjectButton from "./addNewProjectButton";

export default function NoFiling() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16">
      <div>
        <HiLightBulb size={200} style={{ color: "gray", opacity: 0.7 }} />
      </div>
      <div className="text-3xl text-gray-400 font-sukhumvit">
        ยังไม่มีเอกสาร <br></br>เริ่มเปิดโครงกันเลย !
      </div>
      <div>
        <AddNewProjectButton />
      </div>
    </div>
  );
}
