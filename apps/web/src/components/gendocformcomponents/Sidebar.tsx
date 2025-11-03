"use client";
import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { TiHome } from "react-icons/ti";
import { FaFolderOpen } from "react-icons/fa";
import { MdFindInPage, MdNoteAdd } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { HiExclamationCircle } from "react-icons/hi";

// NavLink component
interface NavLinkProps {
  Icon: IconType;
  label: string;
  href: string;
  page?: string;
  currentPage?: string;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({
  Icon,
  label,
  href,
  page,
  currentPage,
  onClick,
}) => {
  const activeColor = '#B91C1C';
  const inactiveColor = '#FFFFFF';

  const isActive = page && currentPage === page;

  const baseClasses = `flex items-center gap-3 rounded-xl px-4 py-3 font-medium text-[1rem] transition-all duration-200`;

  const activeClasses = isActive
    ? "bg-white text-[#B91C1C] shadow-lg backdrop-blur-sm border border-white/20 hover:translate-x-1"
    : "hover:bg-white/10 hover:translate-x-1";


  return (
    <a
      href={href}
      className={`${baseClasses} ${activeClasses}`}
      onClick={onClick}
    >
      <Icon size={25} color={isActive ? activeColor : inactiveColor} />
      <span className="font-medium">{label}</span>
    </a>
  );
};

// Sidebar component
export default function Sidebar() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <aside className="hidden w-[280px] shrink-0 p-6 rounded-2xl bg-gradient-to-b from-[#5a0d0d] to-[#4a0a0a] text-white lg:block shadow-xl">
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col h-fit">
          {/* Brand */}
          <div className="mb-8 flex flex-col items-center gap-3 pb-6 border-b border-white">
            <img src="/assets/logo.svg" alt="Logo" />
          </div>

          {/* Main Nav */}
          <nav className="space-y-2 text-sm">
            <NavLink
              Icon={TiHome}
              label="หน้าแรก"
              href="/"
              page="home"
              currentPage={currentPage}
              onClick={() => setCurrentPage('home')}
            />
            <NavLink
              Icon={FaFolderOpen}
              label="โครงการ"
              href="/"
              page="projects"
              currentPage={currentPage}
              onClick={() => setCurrentPage('projects')}
            />
            <NavLink
              Icon={MdFindInPage}
              label="เอกสาร"
              href="/"
              page="documents"
              currentPage={currentPage}
              onClick={() => setCurrentPage('documents')}
            />
            <NavLink
              Icon={MdNoteAdd}
              label="Gen Doc"
              href="/"
              page="gendoc"
              currentPage={currentPage}
              onClick={() => setCurrentPage('gendoc')}
            />
          </nav>
        </div>

        {/* Footer Nav */}
        <div className="mt-12 space-y-2 border-t border-white pt-6 text-sm opacity-90">
          <NavLink
            Icon={RiDeleteBin6Fill}
            label="ถังขยะ"
            href="/"
          />
          <NavLink
            Icon={HiExclamationCircle}
            label="แจ้งปัญหา"
            href="/"
          />
        </div>
      </div>
    </aside>
  );
}
