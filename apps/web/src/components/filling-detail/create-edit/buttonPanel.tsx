import { FaSave } from "react-icons/fa"

export default function ButtonPanel({
  setShowCreateDocument,
  isDisabled,
}: {
  setShowCreateDocument?: (showCreateDocument: boolean) => void
  isDisabled: boolean
}) {
  return (
    <div className="flex flex-row justify-between text-black">
      <button
        onClick={() => {
          setShowCreateDocument ? setShowCreateDocument(false) : null
        }}
        className="text-2xl bg-transparent font-bold font-sukhumvit flex flex-row hover:bg-slate-200 px-5 py-2 rounded-lg transition duration-300 hover:cursor-pointer hover:scale-105">
        ยกเลิก
      </button>
      <button
        disabled={isDisabled}
        type="submit"
        className="disabled:bg-disabled text-2xl bg-transparent font-bold font-sukhumvit flex flex-row hover:bg-slate-200 px-5 py-2 rounded-lg transition duration-300 hover:cursor-pointer hover:scale-105">
        <FaSave className="h-8 w-8 mr-3" />
        บันทึก
      </button>
    </div>
  )
}
