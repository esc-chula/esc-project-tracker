import { HiLightBulb } from "react-icons/hi";
import { FilePlus } from "lucide-react";
import AddNewProjectButton from "./addNewProjectButton";

export default function NoProject() {
  return (
    <div className="w-[50vw] flex flex-col items-center justify-center p-16">
      <div>
        <HiLightBulb size={200} style={{ color: "gray", opacity: 0.7 }} />
      </div>
      <div className="text-3xl text-gray-400 font-sukhumvit">
        ยังไม่มีโครงการ <br></br>เริ่มเปิดโครงการกันเลย !
      </div>
      <div>
        <AddNewProjectButton />
      </div>
    </div>
  );
}
