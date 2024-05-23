"use client"

import { Step1, Step2, Step3, Step4, Step5 } from "@/src/components/DocumentStatusSvg"
import Stepper from "@mui/joy/Stepper"
import Step, { stepClasses } from "@mui/joy/Step"
import StepIndicator from "@mui/joy/StepIndicator"

function DocumentStatusStep({
  afterBg,
  bg,
  no,
  children,
}: {
  afterBg: string
  bg: string
  no: string
  children: React.ReactNode
}) {
  return (
    <Step
      orientation="vertical"
      sx={{
        "&::after": {
          background: `var(--${afterBg})`,
        },
      }}
      indicator={
        <StepIndicator variant="solid" sx={{ background: `var(--${bg})` }}>
          <span className="text-2xl">{no}</span>
        </StepIndicator>
      }>
      <h5 className="text-center">{children}</h5>
    </Step>
  )
}

export default function DocumentStatusStepper() {
  return (
    <>
      <div className="flex w-full justify-around px-5 items-center mb-5">
        <Step1 fill="fill-rejected" className="w-[20%]" />
        <Step2 fill="fill-rejected" className="w-[20%]" />
        <Step3 fill="fill-rejected" className="w-[20%]" />
        <Step4 fill="fill-rejected" className="w-[20%]" />
        <Step5 fill="fill-rejected" className="w-[20%]" />
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
        <DocumentStatusStep afterBg="rejected" bg="rejected" no="1">
          ขอเลขรัน
        </DocumentStatusStep>
        <DocumentStatusStep afterBg="rejected" bg="rejected" no="2">
          ทำเอกสาร
        </DocumentStatusStep>
        <DocumentStatusStep afterBg="rejected" bg="rejected" no="3">
          ส่งให้ฝ่ายเลขานุการ
          <br />
          ตรวจสอบ
        </DocumentStatusStep>
        <DocumentStatusStep afterBg="rejected" bg="rejected" no="4">
          หัวหน้านิสิต &
          <br />
          รองหัวหน้านิสิต
          <br />
          ลงลายเซ็น
        </DocumentStatusStep>
        <Step
          orientation="vertical"
          indicator={
            <StepIndicator variant="solid" sx={{ background: `var(--rejected)` }}>
              <span className="text-2xl">5</span>
            </StepIndicator>
          }>
          <h5 className="text-center">
            ส่งเอกสาร
            <br />
            ให้กิจการนิสิต
          </h5>
        </Step>
      </Stepper>
    </>
  )
}
