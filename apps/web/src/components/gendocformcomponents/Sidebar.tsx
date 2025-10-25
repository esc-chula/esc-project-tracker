import React, { useState } from 'react';
import { TiHome } from "react-icons/ti";
import { FaFolderOpen } from "react-icons/fa";
import { MdFindInPage, MdNoteAdd } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiExclamationCircle } from "react-icons/hi";

export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState('gendoc');

  const activeColor = '#B91C1C';
  const inactiveColor = '#FFFFFF';

  return (
    <aside className="hidden w-[280px] shrink-0 rounded-2xl bg-gradient-to-b from-[#5a0d0d] to-[#4a0a0a] text-white lg:block h-full shadow-xl">
      <div className="p-6">
        {/* Brand */}
        <div className="mb-8 flex flex-col items-center gap-3 pb-6 border-b border-white/10">
          <img src="/assets/logo.svg" alt="Logo" />
        </div>

        {/* Nav */}
        <nav className="space-y-2 text-sm">
          <a
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[1rem] text-white transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <TiHome
              size={28}
              color={currentPage === 'home' ? activeColor : inactiveColor}
            />
            <span className="font-medium">หน้าแรก</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[1rem] text-white transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <FaFolderOpen 
              size={25}
              color={currentPage === 'projects' ? activeColor : inactiveColor}
            />
            <span className="font-medium">โครงการ</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[1rem] text-white transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <MdFindInPage 
              size={25}
              color={currentPage === 'documents' ? activeColor : inactiveColor}
            />
            <span className="font-medium">เอกสาร</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-xl bg-white px-4 py-3 font-medium text-[1rem] text-[#B91C1C] shadow-lg backdrop-blur-sm border border-white/20"
            href="/"
          >
            <MdNoteAdd 
              size={25}
              color={currentPage === 'gendoc' ? activeColor : inactiveColor}
            />
            <span>Gen Doc</span>
          </a>
        </nav>

        {/* Footer nav */}
        <div className="mt-12 space-y-2 border-t border-white/10 pt-6 text-sm opacity-90">
          <a
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[1rem] text-white transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <RiDeleteBin6Fill 
              size={25}
              color={'#FFFFFF'}
            />
            <span className="font-medium">ถังขยะ</span>
          </a>
          <a
            className="flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[1rem] text-white transition-all duration-200 hover:bg-white/10 hover:translate-x-1"
            href="/"
          >
            <HiExclamationCircle 
              size={25}
              color={'#FFFFFF'}
            />
            <span className="font-medium">แจ้งปัญหา</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
