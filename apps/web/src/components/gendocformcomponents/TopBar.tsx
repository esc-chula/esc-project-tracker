"use client";
import React, { useState } from 'react';
import { IoNotifications, IoPersonCircleSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";

export default function TopBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [projectID, setprojectID] = useState('3002-0003');
  const [projectName, setprojectName] = useState('ขออนุมัติโครงการ');
  const [userName, setuserName] = useState('สมชาย สายชล');

  return (
    <div className="flex flex-col items-center gap-3 border-b px-[3.125rem] pt-[3.125rem] pb-6 h-15/100">
      <div className="flex justify-between w-full min-w-0">
        {/* Breadcrumb + title */}
        <div className='flex gap-2 items-center'>
          <nav className="mb-1 text-2xl text-black">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <a className="hover:underline" href="/">
                  Gen Doc
                </a>
              </li>
              <li>›</li>
              <li className="font-medium text-[#B91C1C]">
                {projectID} {projectName}
              </li>
            </ol>
          </nav>
          <button className='cursor-pointer'>
            <RiDeleteBinLine size={22} color='#737373' />
          </button>
        </div>

        {/* User */}
        <div className="flex items-center gap-[1rem]">
          <div className="relative py-2 cursor-pointer" title="Notifications">
            <IoNotifications size={22} />
            {notificationCount > 0 && (
              <span
                className="
                  absolute top-1 -right-[0.125rem] 
                  flex items-center justify-center
                  w-[0.8125rem] h-[0.8125rem] 
                  text-[0.5rem] font-bold 
                  text-white 
                  bg-red 
                  rounded-full 
                "
              >
                {notificationCount}
              </span>
            )}
          </div>

          <div className="w-px h-6 bg-black/70" />

          {/* User */}
          <div className='flex items-center'>
            <IoPersonCircleSharp size={42} />
            <div
              className="flex items-center gap-[0.8125rem] px-3 py-2 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="hidden text-sm font-medium whitespace-nowrap md:block">
                {userName}
              </div>
              <IoIosArrowDown
                size={16}
                className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"
                  }`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className='flex items-end justify-between w-full'>
        <div className="flex flex-wrap items-center gap-2">
          <button className="rounded-lg border border-[#737373] px-3 py-2 text-[#737373] text-sm hover:bg-neutral-50">
            พิมพ์เอกสาร
          </button>
          <p className="mt-1 text-xs text-[#A3A3A3]">
            หมายเหตุ : <br />กรอกข้อมูลให้ครบถ้วนก่อนจึงจะสามารถพิมพ์เอกสารได้
          </p>
        </div>
        <span className="h-fit inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-[#A3A3A3]">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          เอกสารถูกบันทึกอัตโนมัติแล้ว
        </span>
      </div>
    </div>
  );
}
