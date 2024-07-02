import { FaFolderPlus } from "react-icons/fa"
import Link from "next/link"

export default function AddNewProjectButton() {
  return (
    <Link href="/new-project">
      <button className="bg-red text-foreground text-white px-4 py-2 rounded-lg">
        <FaFolderPlus className="inline-block mr-3" />
        เปิดโครงการใหม่
      </button>
    </Link>
  )
}
