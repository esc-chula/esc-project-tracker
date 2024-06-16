import { FilingType } from "@/src/interface/filing";
import NoData from "../all-projects/noData";
import FilingMenuHeader from "./filingMenuHeader";
import FilingMenuItem from "./filingMenuItem";
import {
  departmentFilingItems,
  statusFilingItems,
} from "@/src/constant/filterFiling";
import SelectType from "../filter/selectType";
import React from "react";
import { mockProject, mockFiling } from "@/src/mock/data";
import { useToast } from "../ui/use-toast";
export default function FilingMenu() {
  const { toast } = useToast();

  const [departmentFiling, setDepartmentFiling] = React.useState<String>("");
  const [statusFiling, setStatusFiling] = React.useState<String>("");
  const [typeFiling, setTypeFiling] = React.useState<String>("");
  const [filings, setFilings] = React.useState<FilingType[]>([]);

  async function fetchData() {
    try {
      // if (
      //   departmentFiling === "" &&
      //   statusFiling === "" &&
      //   typeFiling === ""
      // ) {
      //   const fetchedFiling = await findAllFiling();
      // } else {
      //   const fetchedFiling = await findFilingWithFilter({
      //     status: statusFiling,
      //   });
      // }
      const fetchedFiling = mockFiling;
      if (fetchedFiling) {
        setFilings(fetchedFiling);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        });
      }
    }
  }
  React.useEffect(() => {
    fetchData();
  }, []);

  if (!filings || !filings.length) {
    return (
      <NoData firstLine="ยังไม่มีเอกสาร" secondLine="เริ่มเปิดโครงกันเลย !" />
    );
  }

  return (
    <div className="w-full">
      <div className="w-1/4 grid grid-cols-3 gap-6 mb-5">
        <SelectType
          title="ฝ่าย"
          items={departmentFilingItems}
          sendValue={setDepartmentFiling}
        />
        <SelectType
          title="สถานะ"
          items={statusFilingItems}
          sendValue={setStatusFiling}
        />
        <SelectType
          title="ทั้งหมด"
          items={[{ value: "test", label: "test" }]}
          sendValue={setTypeFiling}
        />
      </div>

      <div className="w-full overflow-scroll rounded-t-xl">
        <table className="w-full border-collapse border-spacing-0 overflow-hidden">
          <FilingMenuHeader />
          {filings.map((filing, index) => (
            <FilingMenuItem filing={filing} index={index + 1} key={filing.id} />
          ))}
        </table>
      </div>
    </div>
  );
}
