'use client';
import { HiDocumentAdd } from 'react-icons/hi';
import { useState } from 'react';
import type { FilingSubType } from '@repo/shared';
import createFiling from '@/src/service/filing/createFiling';
import type { Filing } from '@/src/interface/filing';
import { getUserId } from '@/src/service/auth';
import { typeFilingItemsV2 } from '@/src/constant/filterFiling';
import { toast } from '../ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { findUserByUserId } from "@/src/service/user/findUserByUserId"
import getProjectsByUserId from "@/src/service/project/getProjectsByUserId"
import type { Project } from "@/src/interface/project"
import { Button } from "../ui/button"

export default function PopoverAddFiling({
  children,
  projectId,
  addFilingToParent,
}: {
  children?: React.ReactNode;
  projectId: string;
  addFilingToParent: (filing: Filing) => void;
}) {
  const [filingTypeAndSubType, setFilingTypeAndSubType] = useState<string>("")
  const [filingName, setFilingName] = useState<string>("")
  const [joinedProjects, setJoinedProjects] = useState<Project[]>([])
  const [selectedProjectId, setSelectedProjectId] = useState<string>("")
  const [responsibleStudent, setResponsibleStudent] = useState<string>("")
  const [userId, setUserId] = useState<string>("")
  const [phoneNumber, setPhoneNumber] = useState<string>("")
  const [open, setOpen] = useState<boolean>(false)
  
  const [errors, setErrors] = useState<{
    projectId: boolean
    filingType: boolean
    filingName: boolean
    responsibleStudent: boolean
    phoneNumber: boolean
  }>({
    projectId: false,
    filingType: false,
    filingName: false,
    responsibleStudent: false,
    phoneNumber: false,
  })

  const fetchUser = async () => {
    const userId = await getUserId()
    const userData = await findUserByUserId(userId)
    setUserId(userId)
    if (userData) {
      setResponsibleStudent(userData.username)
      setPhoneNumber(userData.tel ?? "")
    }
    return userId
  }

  const fetchProject = async (userId: string) => {
    const allJoinedProject = await getProjectsByUserId(userId)
    const projects = allJoinedProject.map((project) => project.project)
    setJoinedProjects(projects)
    return projects
  }

  const openAddFilingPopOver = async () => {
    setOpen(!open)
    if (!open) {
      setErrors({
        projectId: false,
        filingType: false,
        filingName: false,
        responsibleStudent: false,
        phoneNumber: false,
      })
    }
    if (joinedProjects.length === 0) {
      const data = await fetchUser()
      const projects = await fetchProject(data)

      if (projectId !== "") {
        const foundProject = projects.find((project) => project.id === projectId)
        if (foundProject) {
          setSelectedProjectId(foundProject.id)
        }
      }
    }
  }

  const submitCreate = async () => {
    const newErrors = {
      projectId: selectedProjectId === "",
      filingType: filingTypeAndSubType === "",
      filingName: filingName === "",
      responsibleStudent: responsibleStudent === "",
      phoneNumber: phoneNumber === "",
    }

    setErrors(newErrors)

    if (Object.values(newErrors).some((error) => error)) {
      return
    }

    try {
      const [filingType, filingSubType] = filingTypeAndSubType.split("-")
      const data = await createFiling(
        selectedProjectId,
        filingName,
        parseInt(filingType),
        userId,
        filingSubType ? (filingSubType as FilingSubType) : null,
        phoneNumber,
      );

      addFilingToParent(data);
      toast({
        title: "สร้างสำเร็จ",
        description: `เอกสาร ${data.projectCode} - ${data.filingCode} ถูกสร้างเรียบร้อยแล้ว`,
      })
      setOpen(false)
      setFilingName("")
      setSelectedProjectId(projectId)
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

  return (
    <Dialog open={open} onOpenChange={openAddFilingPopOver}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button variant="outline" className="hover:cursor-pointer rounded-lg px-4 py-2 bg-red text-white">
            <HiDocumentAdd size={20} className="inline-block mr-2" />
            สร้างเอกสารใหม่
          </Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>สร้างเอกสารใหม่</DialogTitle>
        </DialogHeader>
        <div className="bg-white rounded-lg pt-2 space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name" className={errors.projectId ? "text-red" : ""}>
              ชื่อโครงการ (TH)
              <span className="text-red">*</span>
            </Label>
            <div>
              <Select
                value={selectedProjectId}
                onValueChange={(value) => {
                  setSelectedProjectId(value)
                  setErrors({ ...errors, projectId: false })
                }}
              >
                <SelectTrigger className="w-full border-1 border-black rounded-lg px-4">
                  <SelectValue placeholder="เลือกโครงการ" />
                </SelectTrigger>
                <SelectContent>
                  {joinedProjects.length > 0 ? (
                    joinedProjects.map((project) => (
                      <SelectItem key={project.id} value={project.id}>
                        {project.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      ไม่พบโครงการ
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {errors.projectId && <p className="text-xs text-red pt-1">กรุณาเลือกโครงการ</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="filing-type" className={errors.filingType ? "text-red" : ""}>
              ประเภทเอกสาร
              <span className="text-red">*</span>
            </Label>
            <div>
            <Select
              value={filingTypeAndSubType}
              onValueChange={(value) => {
                setFilingTypeAndSubType(value)
                setErrors({ ...errors, filingType: false })
              }}
            >
              <SelectTrigger className="w-full border-1 border-black rounded-lg px-4">
                <SelectValue placeholder="เลือกประเภทเอกสาร" />
              </SelectTrigger>
              <SelectContent>
                {typeFilingItemsV2.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.filingType && <p className="text-xs text-red pt-1">กรุณาเลือกประเภทเอกสาร</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="filing-name" className={errors.filingName ? "text-red" : ""}>
              ชื่อเอกสาร
              <span className="text-red">*</span>
            </Label>
            <div>
            <Input
              id="filing-name"
              placeholder="ใส่ชื่อเอกสาร"
              className="border-1 w-full px-4 rounded-lg border-black"
              value={filingName}
              onChange={(e) => {
                setFilingName(e.target.value.trim())
                if (e.target.value.trim() !== "") {
                  setErrors({ ...errors, filingName: false })
                }
              }}
              required
            />
            {errors.filingName && <p className="text-xs text-red pt-1">กรุณากรอกชื่อเอกสาร</p>}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="username" className={errors.responsibleStudent ? "text-red" : ""}>
              นิสิตที่รับผิดชอบ
              <span className="text-red">*</span>
            </Label>
            <div>
              <Input
                id="username"
                placeholder="สมชาย สายชล"
                className="border-1 w-full px-4 rounded-lg border-black"
                value={responsibleStudent}
                onChange={(e) => {
                  setResponsibleStudent(e.target.value)
                  if (e.target.value !== "") {
                    setErrors({ ...errors, responsibleStudent: false })
                  }
                }}
                required
              />
              {errors.responsibleStudent && <p className="text-xs text-red pt-1">กรุณากรอกชื่อนิสิตที่รับผิดชอบ</p>}
              </div>
          </div>

          <div className="grid gap-2">
            <Label className={errors.phoneNumber ? "text-red" : ""}>
              เบอร์โทรศัพท์
              <span className="text-red">*</span>
            </Label>
            <div>
            <Input
              id="phone-number"
              placeholder="เบอร์โทรศัพท์ 0xx-xxx-xxxx"
              className="border-1 w-full px-4 rounded-lg border-black"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value.trim())
                if (e.target.value.trim() !== "") {
                  setErrors({ ...errors, phoneNumber: false })
                }
              }}
              required
            />
            {errors.phoneNumber && <p className="text-xs text-red pt-1">กรุณากรอกเบอร์โทรศัพท์</p>}
            </div>
          </div>

          <div className="flex flex-row justify-end gap-2 py-2">
            <Button
              className="disabled:bg-lightgray text-base text-gray-500 border-gray-500 border-1 bg-transparent px-4 h-10 hover:bg-slate-200 rounded-lg transition duration-300"
              onClick={() => setOpen(!open)}
            >
              ยกเลิก
            </Button>
            <Button
              variant="outline"
              type="submit"
              className="disabled:bg-lightgray rounded-lg text-base px-4 h-10 font-medium bg-red text-white"
              onClick={submitCreate}
            >
              <HiDocumentAdd size={20} className="inline-block mr-2" />
              สร้างเอกสาร
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
