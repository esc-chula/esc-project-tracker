export default function NameDate({
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
    <div className="border-r-2 py-8 pr-5 space-y-8 w-[20vw]">
      <div className="flex flex-row items-center space-x-4 ">
        {children}
        <div className="w-[70%]">
          <div className="border-black font-bold overflow-hidden whitespace-nowrap text-ellipsis text-xl">
            {title}
          </div>
          <div className="text-xs">{date}</div>
        </div>
      </div>
      <div>
        <span className="font-bold">กิจกรรม: </span>
        <span>{activity}</span>
      </div>
    </div>
  );
}
