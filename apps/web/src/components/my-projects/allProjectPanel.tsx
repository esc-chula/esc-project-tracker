import SelectType from "./selectType";

export default function AllProjecPanel() {
  return (
    <div className="flex flex-col">
      <div className="text-black font-bold">ทั้งหมด</div>
      <div className="flex flex-row space-x-5">
        <SelectType title="ประเภท" />
        <SelectType title="บุคคล" />
        <SelectType title="ทั้งหมด" />
      </div>
    </div>
  );
}
