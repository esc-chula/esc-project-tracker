export default function Title({
  children,
  icon,
}: {
  children: React.ReactNode
  icon: React.ReactNode
}) {
  return (
    <>
      <div className="flex gap-4 font-bold text-intania text-3xl md:text-4xl lg:text-5xl">
        {icon}
        {children}
      </div>
    </>
  )
}
