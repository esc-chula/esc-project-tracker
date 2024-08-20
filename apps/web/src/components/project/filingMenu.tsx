import { Filing } from "@/src/interface/filing"
import NoData from "../all-projects/noData"
import FilingMenuHeader from "./filingMenuHeader"
import FilingMenuItem from "./filingMenuItem"
import { statusFilingItems, typeFilingItems } from "@/src/constant/filterFiling"
import SelectType from "../filter/selectType"
import React from "react"
import { useToast } from "../ui/use-toast"
import findAllFiling from "@/src/service/findAllFiling"
import { departmentProjectItems } from "@/src/constant/filterProject"
import findFilingsWithFilter from "@/src/service/findFilingsWithFilter"
import getFilingByFilingId from "@/src/service/getFilingByFilingId"
export default function FilingMenu({ searchedFilingId }: { searchedFilingId: string | null }) {
  const { toast } = useToast()

  const [departmentFiling, setDepartmentFiling] = React.useState<string>("ALL")
  const [statusFiling, setStatusFiling] = React.useState<string>("ALL")
  const [typeFiling, setTypeFiling] = React.useState<string>("ALL")
  const [filings, setFilings] = React.useState<Filing[]>([])

  async function fetchData() {
    try {
      if (departmentFiling === "ALL" && statusFiling === "ALL" && typeFiling === "ALL") {
        // case search
        if (searchedFilingId) {
          const filingById = await getFilingByFilingId(searchedFilingId)
          filingById ? setFilings([filingById]) : setFilings([])
        } else {
          // case ปกติ
          const fetchedFiling = await findAllFiling()
          setFilings(fetchedFiling)
        }
      } else {
        // case search
        if (searchedFilingId) {
          const fetchedFiling = await findFilingsWithFilter(
            statusFiling,
            typeFiling,
            departmentFiling,
            searchedFilingId
          )
          if (fetchedFiling) {
            setFilings(fetchedFiling)
          }
        } else {
          // case ปกติ
          const fetchedFiling = await findFilingsWithFilter(
            statusFiling,
            typeFiling,
            departmentFiling
          )
          if (fetchedFiling) {
            setFilings(fetchedFiling)
          }
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "ไม่สำเร็จ",
          description: error.message,
          isError: true,
        })
      }
    }
  }

  React.useEffect(() => {
    fetchData()
  }, [departmentFiling, statusFiling, typeFiling, searchedFilingId])

  return (
    <div className="w-full">
      <div className="w-1/3 lg:w-1/4 grid grid-cols-3 gap-6 mb-5">
        <SelectType title="ฝ่าย" items={departmentProjectItems} sendValue={setDepartmentFiling} />
        <SelectType title="สถานะ" items={statusFilingItems} sendValue={setStatusFiling} />
        <SelectType title="ประเภท" items={typeFilingItems} sendValue={setTypeFiling} />
      </div>

      {!filings.length ? (
        <NoData firstLine="ยังไม่มีเอกสาร" secondLine="เริ่มเปิดโครงกันเลย !" />
      ) : (
        <div className="w-full h-[500px] overflow-x-auto overflow-y-auto rounded-t-xl">
          <table className="w-full text-sm">
            <FilingMenuHeader />
            {filings.map((filing, index) => (
              <FilingMenuItem filing={filing} key={filing.id} />
            ))}
          </table>
        </div>
      )}
    </div>
  )
}
