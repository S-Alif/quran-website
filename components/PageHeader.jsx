import React from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"

function PageHeader({children, headline, bgImage, breadCrumbList = []}) {

  const backgroundImage = bgImage ? bgImage : "https://images.unsplash.com/photo-1693590614566-1d3ea9ef32f7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

  return (
    <section 
      className='page-header w-full h-[50vh]'
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed"
      }}
    >
      <div className="container h-full flex justify-center items-center flex-col">
        <h1 className='text-4xl font-semibold text-white pb-5'>{headline}</h1>
        <Breadcrumb>
          <BreadcrumbList>
            {
              breadCrumbList.length > 0 &&
              breadCrumbList.map((e, index) => (
                <div className='flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5' key={index}>
                  <BreadcrumbItem>
                    <BreadcrumbLink href={e.href} className="text-white font-medium hover:text-primary text-[16px]">{e.title}</BreadcrumbLink>
                  </BreadcrumbItem>
                  {
                    index != (breadCrumbList.length - 1) && <BreadcrumbSeparator className={"text-white"} />
                  }
                </div>
              ))
            }
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </section>
  )
}

export default PageHeader