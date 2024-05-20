import { ChevronLeft } from "lucide-react"
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
}: {
  project: string
  document?: string
  projectId?: string
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        {/* <ChevronLeft size={24} /> */}
        <Breadcrumb>
          <BreadcrumbList className="text-2xl flex-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink href="/projects" className="text-black font-semibold">
                โครงการ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-black" />
            {document ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={"/" + projectId}
                    className="text-black font-semibold line-clamp-1 max-w-56 leading-10">
                    {project}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-red line-clamp-1 leading-10">
                    {document}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-red line-clamp-1 leading-10">
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
