import PageHeader from "@/components/PageHeader"
import { randomBgImage } from "@/helpers/bgImage"
import { dataFetcher } from "../api/dataFetcher"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import ScrollToTop from "@/components/ScrollToTop"

export const metadata = {
  title: "Qur\'An reciter list",
  description: "List of Qur\'An reciters",
}

const fetchReciterList = async () => {
  let result = await dataFetcher("http://api.alquran.cloud/v1/edition?format=audio&language=ar&type=versebyverse")
  return result
}

const Audio = async () => {

  const reciterList = await fetchReciterList()


  return (
    <div className="reciter-selection-page" id="audio-selection-page">
      
      {/* page header */}
      <PageHeader
        headline={"Quran recitation"}
        bgImage={randomBgImage()}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Audio",
            href: "/audio"
          }
        ]}
      />

      {/* quran reciter list */}
      <section className="reciter-list section">
        <div className="container">
          <h3 className="title text-center text-primary !mb-10">Reciter list</h3>

          {/* display cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
            {
              reciterList != null && 
              reciterList.map((e, index) => (
                <Link
                  href={`/audio/${e.identifier}?name=${e.name}&englishName=${e.englishName}`}
                  className=""
                  key={index}
                >
                  <Card className="hover:border-transparent hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-3xl font-bold font-arabic">{e.name}</CardTitle>
                      <CardDescription className="text-xl font-medium">Shaykh {e.englishName}</CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              ))
            }
          </div>
        </div>
      </section>

      <ScrollToTop />

    </div>
  )
}

export default Audio