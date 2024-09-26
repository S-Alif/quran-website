import { dataFetcher } from "@/api/dataFetcher"
import endpoints from "@/api/endpoints"
import PageHeader from "@/components/PageHeader"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb"


async function SurahPage() {

  const getSurahList = async () => {
    let result = await dataFetcher(endpoints.surahList)
    return result
  }

  const surahList = await getSurahList()


  return (
    <div className="surah-list-page">

      {/* page header */}
      <PageHeader 
        headline={"See the list of surah"}
        bgImage={"https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
      >
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="text-white font-medium hover:text-primary text-[16px]">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className={"text-white"} />
            <BreadcrumbItem>
              <BreadcrumbLink href="/surah" className="text-white font-medium hover:text-primary text-[16px]">Surah</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

      </PageHeader>

      {/* display surah list */}
      <section className="surah-list section">
        <div className="container">

          <h3 className="title text-center text-primary">All surah</h3>

          {JSON.stringify(surahList)}

        </div>
      </section>

    </div>
  )
}

export default SurahPage