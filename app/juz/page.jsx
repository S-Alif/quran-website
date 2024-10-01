import PageHeader from "@/components/PageHeader"
import ScrollToTop from "@/components/ScrollToTop"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { randomBgImage } from "@/helpers/bgImage"
import Link from "next/link"

export const metadata = {
  title: "Juz list",
  description: "A list of all juz",
}

const JuzPage = async () => {

  const data = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="juz-list-page">

      {/* page header */}
      <PageHeader
        headline={"See the list of Juz"}
        bgImage={randomBgImage()}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Juz",
            href: "/juz"
          }
        ]}
      />

      {/* display surah list */}
      <section className="surah-list section">
        <div className="container">

          <h3 className="title text-center text-primary">All Juz</h3>

          {/* display cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {
              data.map((e, index) => (
                <Link 
                  href={{
                    pathname: "/juz/read-juz",
                    query: {
                      number: e,
                      lang: "en.asad",
                      offset: "1",
                      limit: 20,
                    }
                  }}
                  className="" 
                  key={index}
                >
                  <Card className="hover:border-transparent hover:shadow-xl transition-shadow duration-300">
                    <CardHeader className="text-center">
                      <CardTitle className="text-xl">Juz - {e}</CardTitle>
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

export default JuzPage