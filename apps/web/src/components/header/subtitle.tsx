import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/src/components/ui/breadcrumb';

export default function Subtitle({
  project,
  filing,
  projectId,
  origin,
}: {
  project: string;
  filing?: string;
  projectId?: string;
  origin?: string;
}) {
  return (
    <>
      <div className="flex flex-col gap-8">
        {/* <ChevronLeft size={24} /> */}
        <Breadcrumb>
          <BreadcrumbList className="text-2xl flex-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink
                href={origin ?? '/projects'}
                className="text-black font-semibold"
              >
                โครงการ
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-black" />
            {filing ? (
              <>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={'/project/' + projectId}
                    className="text-black font-semibold leading-10 max-w-24 line-clamp-1"
                  >
                    {project}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-black" />
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-semibold text-red leading-10 min-w-36 max-w-[17vw] line-clamp-1">
                    {filing}
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
  );
}
