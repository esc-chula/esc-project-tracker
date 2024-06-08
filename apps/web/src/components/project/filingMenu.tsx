import { FilingType } from "@/src/interface/filing";
import NoData from "../all-projects/noData";
import FilingMenuHeader from "./filingMenuHeader";
import FilingMenuItem from "./filingMenuItem";
export default function FilingMenu({ filings }: { filings: FilingType[] }) {
  if (!filings || !filings.length) {
    return (
      <NoData firstLine="ยังไม่มีเอกสาร" secondLine="เริ่มเปิดโครงกันเลย !" />
    );
  }
  return (
    <div className="w-full">
      <FilingMenuHeader />
      {filings.map((filing, index) => (
        <FilingMenuItem filing={filing} index={index + 1} key={filing.id} />
      ))}
    </div>
  );
}
