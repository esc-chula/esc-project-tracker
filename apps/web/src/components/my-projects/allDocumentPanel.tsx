import AllDocumentCard from "./allDocumentCard";
import AllProjectCard from "./allProjectCard";
import SelectType from "./selectType";

export default function AllDocumentPanel() {
  return (
    <div className="space-y-5">
      <div className="flex flex-row space-x-5">
        <SelectType title="ประเภท" />
        <SelectType title="บุคคล" />
        <SelectType title="ทั้งหมด" />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-col-2 w-[55vw] gid-row-2 gap-x-4 gap-y-4 pr-8">
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
        <AllDocumentCard />
      </div>
    </div>
  );
}
