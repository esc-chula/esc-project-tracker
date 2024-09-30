export default function NameDateStatus({
  children,
  title,
  date,
  activity,
}: {
  children: React.ReactNode;
  title: string;
  date: string;
  activity: string;
}) {
  return (
    <div className="w-full flex flex-row justify-between">
      <div className="flex flex-row items-center space-x-4">
        {children}
        <div className="w-[60%]">
          <div className="border-black font-bold overflow-hidden whitespace-nowrap text-ellipsis text-xl">
            {title}
          </div>
          <div className="text-xs">{date}</div>
        </div>
      </div>
      <div className="flex items-end justify-end">
        <span className="font-bold">{'กิจกรรม: '}</span>
        <span>{activity}</span>
      </div>
    </div>
  );
}
