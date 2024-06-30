import { HiLightBulb } from "react-icons/hi";
import { FilePlus } from "lucide-react";
import AddNewProjectButton from "./addNewProjectButton";

export default function NoData({
  firstLine,
  secondLine,
}: {
  firstLine: string;
  secondLine: string;
}) {
  return (
    <div className="w-full flex flex-col items-center justify-center p-16 space-y-5">
      <div>
        <HiLightBulb size={200} style={{ color: "gray", opacity: 0.7 }} />
      </div>
      <div className="text-3xl text-gray-400 font-sukhumvit text-center">
        {firstLine} <br></br> {secondLine}
      </div>
      <div>
        <AddNewProjectButton />
      </div>
    </div>
  );
}
