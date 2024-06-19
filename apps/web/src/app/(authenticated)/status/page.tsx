"use client";
import { Radio } from "lucide-react";
import Header from "../../../components/header/header";
import Title from "@/src/components/header/title";
import DocumentStatusStepper from "@/src/components/status/StatusStepper";
import { StatusTable } from "@/src/components/status/StatusTable";
import getFilingsByUserId from "@/src/service/getFilingsByUserId";
import { FilingType } from "@/src/interface/filing";
import { useToast } from "@/src/components/ui/use-toast";
import { useEffect, useState } from "react";
// const mockData: FilingType[] = [
//   {
//     id: "m5gr84i91",
//     status: FilingStatus.DRAFT,
//     name: "Filing 1 weosiyfgowausyh ngcfowauy afgseahgesrytedgsetyh",
//     projectCode: "1001",
//     FilingCode: "9001",
//     type: 9,
//     user: {},
//     project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
//     createdAt: new Date("2021-08-01T19:11:00").toString(),
//     updatedAt: new Date("2021-08-01T19:11:00").toString(),
//   },
//   {
//     id: "m5gr84i92",
//     status: FilingStatus.WAIT_FOR_SECRETARY,
//     name: "Filing 2",
//     projectCode: "1001",
//     FilingCode: "9002",
//     type: 9,
//     user: {},
//     project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
//     createdAt: new Date("2021-08-01T19:11:00").toString(),
//     updatedAt: new Date("2021-08-01T19:11:00").toString(),
//   },
//   {
//     id: "m5gr84i93",
//     status: FilingStatus.WAIT_FOR_STUDENT_AFFAIR,
//     name: "Filing 3",
//     projectCode: "1001",
//     FilingCode: "9003",
//     type: 9,
//     user: {},
//     project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
//     createdAt: new Date("2021-08-01T19:11:00").toString(),
//     updatedAt: new Date("2021-08-01T19:11:00").toString(),
//   },
//   {
//     id: "m5gr84i94",
//     status: FilingStatus.RETURNED,
//     name: "Filing 4",
//     projectCode: "1001",
//     FilingCode: "9004",
//     type: 9,
//     user: {},
//     project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
//     createdAt: new Date("2021-08-01T19:11:00").toString(),
//     updatedAt: new Date("2021-08-01T19:11:00").toString(),
//   },
//   {
//     id: "m5gr84i95",
//     status: FilingStatus.APPROVED,
//     name: "Filing 5",
//     projectCode: "1001",
//     FilingCode: "9005",
//     type: 9,
//     user: {},
//     project: { id: "d1c0d106-1a4a-4729-9033-1b2b2d52e98a" },
//     createdAt: new Date("2021-08-01T19:11:00").toString(),
//     updatedAt: new Date("2021-08-01T19:11:00").toString(),
//   },
// ];

export default function Page() {
  // TODO: Change the userId to the actual userId
  const { toast } = useToast();
  const [statuses, setStatuses] = useState<FilingType[]>([]);

  useEffect(() => {
    const fetchFiling = async () => {
      try {
        const data = await getFilingsByUserId(
          "d1c0d106-1a4a-4729-9033-1b2b2d52e98a"
        );
        setStatuses(data);
      } catch (err) {
        if (err instanceof Error) {
          toast({
            title: "ไม่สำเร็จ",
            description: err.message,
            isError: true,
          });
        }
      }
    };
    void fetchFiling();
  }, []);

  return (
    <>
      <main className="w-full pt-[68px]">
        <div className="pl-15 pr-5">
          <Header>
            <Title icon={<Radio size={40} />}>ติดตามสถานะ</Title>
          </Header>
        </div>

        <div className="bg-lightpink flex flex-col pt-12 pb-5 items-center mt-5 w-full">
          <h3 className="mb-8 text-2xl text-intania font-bold">
            ขั้นตอนการส่งเอกสาร
          </h3>
          <DocumentStatusStepper status="DEFAULT" />
        </div>
        <StatusTable data={statuses} />
      </main>
    </>
  );
}
