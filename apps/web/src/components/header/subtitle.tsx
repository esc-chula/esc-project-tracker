import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb"

export default function Subtitle({
  project,
  document,
  projectId,
  origin,
  adminDisplay = false,
}: {
  project: string
  document?: string
  projectId?: string
  origin?: string
  adminDisplay?: boolean
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        {/* <ChevronLeft size={24} /> */}
        <Breadcrumb>
          <BreadcrumbList className="text-2xl flex-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink href={origin ?? "/projects"} className="text-black font-semibold">
                โครงการ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-black" />
            {document ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={"/project/" + projectId}
                    className="text-black font-semibold leading-10 max-w-24 line-clamp-1">
                    {project}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className={`font-semibold ${adminDisplay ? "text-darkpink" : "text-red"} leading-10 min-w-36 max-w-96 line-clamp-1`}>
                    {document}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage
                    className={`font-semibold ${adminDisplay ? "text-darkpink" : "text-red"} line-clamp-1 leading-10`}>
                    {project}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  )
}
