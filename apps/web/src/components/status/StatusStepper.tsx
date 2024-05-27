"use client"

import { Step1, Step2, Step3, Step4, Step5 } from "@/src/components/status/StatusSvg"
import Stepper from "@mui/joy/Stepper"
import Step, { stepClasses } from "@mui/joy/Step"
import StepIndicator from "@mui/joy/StepIndicator"
import { FilingStatus } from "../../constant/enum"
import { FilingStatusToStepper } from "@/src/styles/enumMap"

const steps = [
  { no: "1", children: <>ขอเลขรัน</> },
  { no: "2", children: <>ทำเอกสาร</> },
  {
    no: "3",
    children: (
      <>
        ส่งให้ฝ่ายเลขานุการ
        <br />
        ตรวจสอบ
      </>
    ),
  },
  {
    no: "4",
    children: (
      <>
        หัวหน้านิสิต &
        <br />
        รองหัวหน้านิสิต
        <br />
        ลงลายเซ็น
      </>
    ),
  },
  {
    no: "5",
    children: (
      <>
        ส่งเอกสาร
        <br />
        ให้กิจการนิสิต
      </>
    ),
  },
]

export default function DocumentStatusStepper({ status }: { status: FilingStatus | "DEFAULT" }) {
  const stepStatuses =
    status === "DEFAULT"
      ? [
          ["rejected", "rejected"],
          ["rejected", "rejected"],
          ["rejected", "rejected"],
          ["rejected", "rejected"],
          ["rejected"],
        ]
      : FilingStatusToStepper[status]

  return (
    <>
      <div className="flex w-full justify-around px-5 items-center mb-5">
        <Step1 fill={stepStatuses[0][0]} className="w-[20%]" />
        <Step2 fill={stepStatuses[1][0]} className="w-[20%]" />
        <Step3 fill={stepStatuses[2][0]} className="w-[20%]" />
        <Step4 fill={stepStatuses[3][0]} className="w-[20%]" />
        <Step5 fill={stepStatuses[4][0]} className="w-[20%]" />
      </div>
      <Stepper
        orientation="horizontal"
        sx={{
          width: "100%",
          paddingX: "1.25rem",
          "--StepIndicator-size": "2.5rem",
          "--Step-gap": "1rem",
          "--Step-connectorInset": "0px",
          "--Step-connectorThickness": "3px",
          fontFamily: "var(--sukhumvit-set-font)",
          [`& .${stepClasses.disabled} *`]: {
            color: "neutral.softDisabledColor",
          },
        }}>
        {stepStatuses.map((stepStatus, index) => {
          return (
            <Step
              key={index}
              orientation="vertical"
              disabled={stepStatus[0] === "disabled"}
              sx={{
                "&::after": {
                  background: `var(--${stepStatus[1]})`,
                },
              }}
              indicator={
                <StepIndicator variant="solid" sx={{ background: `var(--${stepStatus[0]})` }}>
                  <span className="text-2xl">{steps[index].no}</span>
                </StepIndicator>
              }>
              <h5 className="text-center">{steps[index].children}</h5>
            </Step>
          )
        })}
      </Stepper>
    </>
  )
}
