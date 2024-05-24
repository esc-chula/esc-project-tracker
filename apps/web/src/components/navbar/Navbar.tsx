"use client"

import {
  ChevronLast,
  ChevronFirst,
  Home,
  FileSearch,
  Folders,
  Radio,
  FilePlus,
  Trash2,
  MessageSquareWarning,
} from "lucide-react"
import { useState } from "react"
import Image from "next/image"
import NavbarItem from "./NavbarItem"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const [expanded, setExpanded] = useState(true)
  const pathname = usePathname()
  return (
    <aside className="h-screen bg-intania flex-none sticky top-0">
      <button
        onClick={() => setExpanded((curr) => !curr)}
        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 absolute -right-4 top-14">
        {expanded ? <ChevronFirst /> : <ChevronLast />}
      </button>
      <nav
        className={`h-full flex flex-col max-w-60 justify-between overflow-x-hidden transition-all overflow-y-scroll no-scrollbar py-14 ${expanded ? "px-10" : "px-4"}`}>
        <div className="flex flex-col justify-between items-center gap-3.5 px-2">
          <Image
            src="/icons/esc.svg"
            className="overflow-hidden"
            height={56}
            width={38}
            alt="logo"
          />
          <span
            className={`text-white text-sm text-center font-semibold overflow-hidden text-nowrap ${expanded ? "w-full" : "w-0"}`}>
            Document System
          </span>
          <hr className="w-full bg-white my-5" />
        </div>
        <ul className="flex-1 flex gap-2.5 flex-col">
          <NavbarItem
            icon={<Home size={20} />}
            text="หน้าหลัก"
            expanded={expanded}
            active={pathname === "/home"}
            href="/home"
          />
          <NavbarItem
            icon={<FileSearch size={20} />}
            text="โครงการทั้งหมด"
            active={pathname === "/projects"}
            href="/projects"
            expanded={expanded}
          />
          <NavbarItem
            icon={<Folders size={20} />}
            text="โครงการของฉัน"
            expanded={expanded}
            active={pathname === "/my-projects"}
            href="/my-projects"
          />
          <NavbarItem
            icon={<Radio size={20} />}
            text="ติดตามสถานะ"
            expanded={expanded}
            active={pathname === "/status"}
            href="/status"
          />
          <NavbarItem
            icon={<FilePlus size={20} />}
            text="Gen Doc"
            expanded={expanded}
            active={pathname === "/gendoc"}
            href="/gendoc"
          />
        </ul>

        <div className="flex flex-col">
          <div className="px-2">
            <hr className="w-full bg-white my-5" />
          </div>

          <ul className="flex-1 flex gap-1.5 flex-col">
            <NavbarItem
              icon={<Trash2 size={20} />}
              text="ถังขยะ"
              expanded={expanded}
              active={pathname === "/trash"}
              href="/trash"
            />
            <NavbarItem
              icon={<MessageSquareWarning size={20} />}
              text="แจ้งปัญหา"
              expanded={expanded}
              active={pathname === "/report"}
              href="/report"
            />
          </ul>
        </div>
      </nav>
    </aside>
  )
}
