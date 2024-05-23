import { MockFilling } from "@/src/mock/type";
import AllDocumentCard from "./allDocumentCard";
import SelectType from "./selectType";

export default function AllDocumentPanel({
  fillings,
}: {
  fillings: MockFilling[];
}) {
  return (
    <div className="space-y-5 pt-5 pb-10">
      <div className="flex flex-row space-x-5">
        <SelectType title="ประเภท" />
        <SelectType title="บุคคล" />
        <SelectType title="ทั้งหมด" />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-col-2 w-[55vw] gid-row-2 gap-x-4 gap-y-4 pr-8">
        {fillings.map((filling) => (
          <AllDocumentCard
            key={filling.id}
            fillingId={filling.id}
            fillingCode={filling.code}
            fillingName={filling.name}
            fillingStatus={filling.status}
          />
        ))}
      </div>
    </div>
  );
}
