import { FilingType } from "@/src/interface/filing";
import NoData from "../all-projects/noData";
import FilingMenuHeader from "./filingMenuHeader";
import FilingMenuItem from "./filingMenuItem";
import { typeFilingItems } from "@/src/constant/filterFiling";
import SelectType from "../filter/selectType";
import React from "react";
import { mockProject, mockFiling } from "@/src/mock/data";
export default function FilingMenu() {
  const [departmentFiling, setDepartmentFiling] = React.useState<String>("");
  const [statusFiling, setStatusFiling] = React.useState<String>("");
  const [typeFiling, setTypeFiling] = React.useState<String>("");
  const [filings, setFilings] = React.useState<FilingType[]>([]);

  React.useEffect(() => {
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
        console.log(error);
        throw new Error("Failed to fetch data");
      }
    }

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
          items={[{ value: "test", label: "test" }]}
          sendValue={setDepartmentFiling}
        />
        <SelectType
          title="สถานะ"
          items={[{ value: "test", label: "test" }]}
          sendValue={setStatusFiling}
        />
        <SelectType
          title="ประเภท"
          items={typeFilingItems}
          sendValue={setTypeFiling}
        />
      </div>

      <div className="w-full">
        <FilingMenuHeader />
        {filings.map((filing, index) => (
          <FilingMenuItem filing={filing} index={index + 1} key={filing.id} />
        ))}
      </div>
    </div>
  );
}
