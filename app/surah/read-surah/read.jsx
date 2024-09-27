'use client'

import AyahText from '@/components/AyahText'
import PageHeader from '@/components/PageHeader'
import SurahInfoCard from '@/components/SurahInfoCard'
import React, { useState } from 'react'

function Read({ englishName, language, infoMap, ayahs, numberOfAyahs, offset, limit, translations}) {

  console.log(ayahs, translations)

  const [readMoreBtn, setReadMoreBtn] = useState(false)
  const [lang, setLang] = useState(language || "en.asad")

  // read more
  const readMore = () => {
    if((offset * limit) <= numberOfAyahs) return
    const newOffset = offset + 1
    router.push(
      `/surah/read-surah?number=${infoMap.number}&lang=${lang}&offset=${newOffset}&limit=${limit}`,
      { scroll: false }
    )
  }


  return (
    <div className='read-surah-page'>

      {/* page header */}
      <PageHeader
        headline={"Read surah " + englishName}
        bgImage={"https://plus.unsplash.com/premium_photo-1677587536653-0d02efbb70ee?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Surah",
            href: "/surah"
          },
          {
            title: englishName,
            href: "#"
          }
        ]}
      />


      {/* surah details */}
      <section className="surah-details section" id="surah-details">
        <div className="container">

          <h3 className='title text-center text-primary'>Surah information</h3>

          {/* display cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 pt-4">
            {
              infoMap != null &&
              Object.keys(infoMap).map((e, index) => (
                <SurahInfoCard infoName={e} infoValue={infoMap[e]} key={index} />
              ))
            }
          </div>
        </div>
      </section>

      {/* show surah */}
      <section className="show-surah section bg-gray-100" id="show-surah">
        <div className="container">
          <h3 className='title text-center text-primary font-arabic font-bold'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h3>

          <div className="show-surah-text pt-4">
            {
              (ayahs != null && ayahs.length > 0) &&
              ayahs.map((e, index) => (
                <AyahText 
                  ayah={e.text}
                  ayahNumber={e.numberInSurah}
                  translation={translations[index].text}
                />
              ))
            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default Read