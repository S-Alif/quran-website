'use client'

import DisplayAyahs from '@/components/DisplayAyahs'
import PageHeader from '@/components/PageHeader'
import ScrollToTop from '@/components/ScrollToTop'
import SurahListCard from '@/components/SurahListCard'
import TranslationSelect from '@/components/TranslationSelect'
import { randomBgImage } from '@/helpers/bgImage'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Read = ({ 
  juzNumber, 
  language, 
  infoMap, 
  ayahs = [], 
  numberOfAyahs, 
  translations = [], 
  translationsList = [] 
}) => {

  const [currentAyahs, setCurrentAyahs] = useState([])
  const [initialAyahs, setInitialAyahs] = useState(ayahs)
  const [currentTranslations, setCurrentTranslations] = useState([])
  const [initialTranslations, setinitialTranslations] = useState(translations)
  const [pageOffset, setPageOffset] = useState(1)
  const [lang, setLang] = useState(language || "en.asad")
  const [loading, setLoading] = useState(false)

  const limit = 20
  const router = useRouter()


  // internal pagination
  const internalPagination = (languageChanged, offset, newTranslation) => {
    let startIndex = (offset - 1) * limit
    let endIndex = startIndex + limit

    if(languageChanged && newTranslation){
      startIndex = 0
      endIndex = offset * limit
      setCurrentTranslations([...newTranslation.slice(startIndex, endIndex)])
    }
    else{
      setCurrentTranslations([...currentTranslations, ...initialTranslations.slice(startIndex, endIndex)])
      setCurrentAyahs([...currentAyahs, ...initialAyahs.slice(startIndex, endIndex)])
    }
    setPageOffset(offset)
    setLoading(false)
  }

  // fetch data
  const fetchData = async (url, pageUrl, newOffset, languageChanged) => {
    try {
      const response = await axios.get(url)
      const data = await response.data

      if (languageChanged) {
        setinitialTranslations([...data.ayahs])
        internalPagination(languageChanged, newOffset, [...data.ayahs])
        setPageOffset(1)
      }
      router.push(pageUrl, { scroll: false, shalow: true })
      setPageOffset(newOffset)

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
    if (languageChanged) {
      setLang(laguageValue)
      newOffset = newOffset - 1
      let url = `/api/juz?number=${juzNumber}&lang=${laguageValue}&offset=${1}&limit=${pageOffset * limit}`
      let pageUrl = `/juz/read-juz?number=${juzNumber}&lang=${laguageValue}&offset=${1}&limit=${pageOffset * limit}`

      await fetchData(url, pageUrl, newOffset, languageChanged)
      return
    }

    if ((pageOffset * limit) >= numberOfAyahs) return
    router.push(`/juz/read-juz?number=${juzNumber}&lang=${laguageValue}&offset=${newOffset}&limit=${limit}`, {scroll: false, shalow: true})
    internalPagination(languageChanged, newOffset)
  }


  useEffect(() => {
    internalPagination(false, pageOffset)
  }, [])
  

  return (
    <div className='read-surah-page'>

      {/* page header */}
      <PageHeader
        headline={"Read Juz - " + juzNumber}
        bgImage={randomBgImage()}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Juz",
            href: "/juz"
          },
          {
            title: "Juz - " + juzNumber,
            href: "#"
          }
        ]}
      />

      {/* surah details */}
      <section className="surah-details section" id="surah-details">
        <div className="container">

          <h3 className='title text-center text-primary'>Surahs in the juz</h3>

          {/* display cards */}
          <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 pt-4">
            {
              infoMap != null &&
              Object.keys(infoMap).map((e) => {
                const surah = infoMap[e]

                return (
                  <SurahListCard surahListItem={surah}  />
                )
              })
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

      {/* show ayahs */}
      <DisplayAyahs 
        currentAyahs={currentAyahs}
        currentTranslations={currentTranslations}
        numberOfAyahs={numberOfAyahs}
        pageOffset={pageOffset}
        limit={limit}
        loading={loading}
        readMoreAndChangeLanguage={readMoreAndChangeLanguage}
        lang={lang}
        juzpage={true}
      />

      <ScrollToTop />

    </div>
  )
}

export default Read