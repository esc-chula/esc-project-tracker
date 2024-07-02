import { ArrowUpFromLine } from "lucide-react"
import { FormControl } from "../../ui/form"
import { FaFile } from "react-icons/fa"
import { UseFormRegisterReturn } from "react-hook-form"

export default function FileInputPanel({
  fileRef,
  fileList,
}: {
  fileRef: UseFormRegisterReturn<"file">
  fileList: FileList | undefined
}) {
  console.log(fileList)

  return (
    <FormControl className="flex-grow">
      <div className="relative flex flex-col w-full items-center justify-center p-6 border-4 border-dashed border-gray-300 text-center cursor-pointer rounded-lg hover:bg-gray-100 bg-white">
        {/* If have file show file name*/}
        {fileList ? (
          <>
            <div className="text-base font-semibold  h-full items-center flex">
              <FaFile style={{ color: "skyblue" }} className="inline mr-2 h-10 w-10" />
              <div className="truncate max-w-[15vw]">
                {fileList[0].name.split(".").slice(0, -1).join(".")}
              </div>
              <div>
                {"."}
                {fileList[0].name.split(".").pop()}
              </div>
            </div>
          </>
        ) : (
          <div className="h-full items-center flex">
            <ArrowUpFromLine className="h-10 w-10 text-gray-400 " />
          </div>
        )}

        <input
          type="file"
          {...fileRef}
          className="absolute inset-0 w-full min-h-full opacity-0 cursor-pointer"
        />
      </div>
    </FormControl>
  )
}
