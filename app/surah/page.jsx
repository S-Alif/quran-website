import { dataFetcher } from "@/app/api/dataFetcher"
import endpoints from "@/app/api/endpoints"
import PageHeader from "@/components/PageHeader"
import ScrollToTop from "@/components/ScrollToTop"
import SurahListCard from "@/components/SurahListCard"
import { randomBgImage } from "@/helpers/bgImage"

export const metadata = {
  title: "Sura List",
  description: "List of all surah in the Qur\'An",
}

const SurahPage = async () => {

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
        bgImage={randomBgImage()}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Surah",
            href: "/surah"
          }
        ]}
      />

      {/* display surah list */}
      <section className="surah-list section">
        <div className="container">

          <h3 className="title text-center text-primary">All surah</h3>

          {/* display cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {
              surahList != null &&
              surahList.map((e, index) => (
                <SurahListCard surahListItem={e} key={index}  />
              ))
            }
          </div>
        </div>
      </section>

      <ScrollToTop />

    </div>
  )
}

export default SurahPage