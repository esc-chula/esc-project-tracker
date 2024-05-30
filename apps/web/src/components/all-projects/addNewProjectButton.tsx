import { FaFolderPlus } from "react-icons/fa";

export default function AddNewProjectButton() {
  return (
    <button className="bg-red text-foreground text-white px-4 py-2 rounded-lg">
      <FaFolderPlus className="inline-block mr-3" />
      เปิดโครงการใหม่
    </button>
  );
}
