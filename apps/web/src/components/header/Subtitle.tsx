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
      <div className="flex flex-col gap-7">
        <ChevronLeft size={24} />
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
                    className="text-black font-semibold line-clamp-1 max-w-52">
                    {project}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-red">{document}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            ) : (
              <>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-red">{project}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </>
  )
}
