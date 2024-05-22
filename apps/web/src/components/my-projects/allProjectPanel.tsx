import AllProjectCard from "./allProjectCard";
import SelectType from "./selectType";

export default function AllProjecPanel() {
  return (
    <div className="space-y-5">
      <div className="text-black  font-bold">ทั้งหมด</div>
      <div className="flex flex-row space-x-5">
        <SelectType title="ประเภท" />
        <SelectType title="บุคคล" />
        <SelectType title="ทั้งหมด" />
      </div>
      <div className="grid lg:grid-cols-4 md:grid-col-2 w-[50vw] gid-row-2 gap-x-4 gap-y-10 pr-8">
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
        <AllProjectCard />
      </div>
    </div>
  );
}
