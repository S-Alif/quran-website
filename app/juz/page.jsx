import PageHeader from "@/components/PageHeader"
import ScrollToTop from "@/components/ScrollToTop"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const JuzPage = async () => {

  const data = Array.from({ length: 30 }, (_, i) => i + 1)

  return (
    <div className="surah-list-page">

      {/* page header */}
      <PageHeader
        headline={"See the list of surah"}
        bgImage={"https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
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