export default function TextareaForDisplay({ value }: { value?: string }) {
  return (
    <textarea
      className="bg-white rounded-lg min-h-[10vh] p-5 font-normal text-gray-600 break-words resize-none w-full text-sm"
      defaultValue={value}
      disabled
    />
  );
}
