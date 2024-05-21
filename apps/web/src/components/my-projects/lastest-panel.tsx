import Subtitle from "../header/Subtitle";
import Title from "../header/Title";
import LastestItem from "./lastest-item";

export default function LastestPanel() {
  return (
    <div className="flex flex-col">
      <div>ล่าสุด</div>
      <div className="bg-[#D9D9D9] bg-opacity-20 flex flex-row justify-between p-5 rounded-lg">
        <LastestItem />
        <LastestItem />
        <LastestItem />
        <LastestItem />
      </div>
    </div>
  );
}
