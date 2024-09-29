'use client'

import DisplayAyahs from '@/components/DisplayAyahs'
import PageHeader from '@/components/PageHeader'
import ScrollToTop from '@/components/ScrollToTop'
import SurahInfoCard from '@/components/SurahInfoCard'
import TranslationSelect from '@/components/TranslationSelect'
import { randomBgImage } from '@/helpers/bgImage'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

const Read = ({ 
  englishName, language,
   infoMap, ayahs = [],
   numberOfAyahs, offset,
   limit, translations = [], 
   translationsList = []
  }) => {

  const [currentAyahs, setCurrentAyahs] = useState(ayahs)
  const [currentTranslations, setCurrentTranslations] = useState(translations)
  const [pageOffset, setPageOffset] = useState(offset)
  const [lang, setLang] = useState(language || "en.asad")
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const searchParams = useSearchParams()
  const currentOffset = searchParams.get("offset")
  const currentLimit = searchParams.get("limit")

  // fetch data
  const fetchData = async (url, pageUrl, newOffset, languageChanged) => {
    try {
      const response = await axios.get(url)
      const data = await response.data

      if (languageChanged) {
        setCurrentAyahs([...data.ayahs])
        setCurrentTranslations([...data.translations])
      }
      else {
        setCurrentAyahs([...currentAyahs, ...data.ayahs])
        setCurrentTranslations([...currentTranslations, ...data.translations])
      }
      router.push(pageUrl, { scroll: false, shalow: true })
      setPageOffset(parseInt(newOffset))

      setLoading(false)

    } catch (error) {
      console.log(error)
      alert("something went wrong")
    }
  }

  // read more
  const readMoreAndChangeLanguage = async (laguageValue) => {
    let newOffset = pageOffset + 1
    setLoading(true)
    
    let languageChanged = laguageValue != lang
    if(languageChanged) {
      setLang(laguageValue)
      let url = `/api/surah?number=${infoMap.number}&lang=${laguageValue}&offset=1&limit=${currentOffset * currentLimit}`
      let pageUrl = `/surah/read-surah?number=${infoMap.number}&lang=${laguageValue}&offset=1&limit=${currentOffset * currentLimit}`

      await fetchData(url, pageUrl, currentOffset, languageChanged)
      return
    }
    
    if((offset * limit) >= numberOfAyahs) return
    let url = `/api/surah?number=${infoMap.number}&lang=${language}&offset=${newOffset}&limit=${10}`
    let pageUrl = `/surah/read-surah?number=${infoMap.number}&lang=${language}&offset=${newOffset}&limit=${10}`
    await fetchData(url, pageUrl, newOffset, languageChanged)
  }


  return (
    <div className='read-surah-page'>

      {/* page header */}
      <PageHeader
        headline={"Read surah " + englishName}
        bgImage={randomBgImage()}
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

      {/* select translation */}
      <TranslationSelect 
        value={lang}
        onChange={readMoreAndChangeLanguage}
        list={translationsList}
      />

      {/* show surah */}
      <DisplayAyahs 
        currentAyahs={currentAyahs}
        currentTranslations={currentTranslations}
        numberOfAyahs={numberOfAyahs}
        pageOffset={pageOffset}
        limit={10}
        loading={loading}
        readMoreAndChangeLanguage={readMoreAndChangeLanguage}
        lang={lang}
      />


      <ScrollToTop />

    </div>
  )
}

export default Read