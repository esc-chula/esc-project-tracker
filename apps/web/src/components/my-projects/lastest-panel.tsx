import LastestItem from "./lastest-item";

export default function LastestPanel() {
  return (
    <div className="flex flex-col">
      <div className="text-black font-bold">ล่าสุด</div>
      <div className="bg-[#D9D9D9] bg-opacity-20 flex flex-row justify-between p-5 rounded-lg">
        <LastestItem projectCode="8888" projectName="โครงการอบรมเด็กยากไร้" />
        <LastestItem
          projectCode="5555"
          projectName="โครงการอบบมอิอิอิอิิอิอิอิอิ"
        />
        <LastestItem projectCode="4444" projectName="โครงการแฟหแหฟฟหแ" />
        <LastestItem projectCode="1111" projectName="cascascascasc" />
      </div>
    </div>
  );
}
