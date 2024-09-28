'use client'

import AyahText from '@/components/AyahText'
import CardLoader from '@/components/CardLoader'
import PageHeader from '@/components/PageHeader'
import SurahInfoCard from '@/components/SurahInfoCard'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useState } from 'react'

function Read({ englishName, language, infoMap, ayahs, numberOfAyahs, offset, limit, translations}) {

  const [currentAyahs, setCurrentAyahs] = useState(ayahs)
  const [currentTranslations, setCurrentTranslations] = useState(translations)
  const [pageOffset, setPageOffset] = useState(offset)
  const [lang, setLang] = useState(language || "en.asad")
  const [loading, setLoading] = useState(false)

  // read more
  const readMore = async () => {
    if((offset * limit) >= numberOfAyahs) return
    const newOffset = pageOffset + 1
    
    try {
      setLoading(true)
      const response = await axios.get(`/api/surah?number=${infoMap.number}&lang=${language}&offset=${newOffset}&limit=${limit}`)
      const data = await response.data

      setCurrentAyahs([...currentAyahs, ...data.ayahs])
      setCurrentTranslations([...currentTranslations, ...data.translations])
      setPageOffset(newOffset)
      setLoading(false)
    } catch (error) {
      alert("something went wrong")
    }
    
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
      <section className="show-surah section bg-gray-100 dark:bg-inherit" id="show-surah">
        <div className="container">
          <h3 className='title text-center text-primary font-arabic font-bold'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h3>

          <div className="show-surah-text pt-4">
            {
              (currentAyahs != null && currentAyahs.length > 0) &&
              currentAyahs.map((e, index) => (
                <AyahText 
                  ayah={e.text}
                  ayahNumber={e.numberInSurah}
                  translation={currentTranslations[index].text}
                  key={index}
                />
              ))
            }
          </div>

          {
            ((pageOffset * limit) < numberOfAyahs && !loading) &&
            <div className='pt-5 text-center'>
                <Button className="w-full max-w-96 py-5" onClick={readMore}>Read more</Button>
            </div>
          }

          {
            loading && 
            <>
              <CardLoader />
              <CardLoader />
              <CardLoader />
            </>
          }
        </div>
      </section>

    </div>
  )
}

export default Read