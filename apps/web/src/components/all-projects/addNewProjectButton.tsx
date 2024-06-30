"use client";
import { FaFolderPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function AddNewProjectButton() {
  const router = useRouter();
  return (
    <button
      className="bg-red text-foreground text-white px-4 py-2 rounded-lg"
      onClick={() => router.push("/new-project")}
    >
      <FaFolderPlus className="inline-block mr-3" />
      เปิดโครงการใหม่
    </button>
  );
}
