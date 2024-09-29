'use client'

import AyahText from '@/components/AyahText'
import CardLoader from '@/components/CardLoader'
import PageHeader from '@/components/PageHeader'
import ScrollToTop from '@/components/ScrollToTop'
import SurahInfoCard from '@/components/SurahInfoCard'
import TranslationSelect from '@/components/TranslationSelect'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import { randomBgImage } from '@/helpers/bgImage'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState } from 'react'

function Read({ englishName, language, infoMap, ayahs = [], numberOfAyahs, offset, limit, translations = [], translationsList = []}) {

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
    if(languageChanged) {
      setLang(laguageValue)
      let url = `/api/surah?number=${infoMap.number}&lang=${laguageValue}&offset=${1}&limit=${currentOffset * currentLimit}`
      let pageUrl = `/surah/read-surah?number=${infoMap.number}&lang=${laguageValue}&offset=${1}&limit=${currentOffset * currentLimit}`

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
      {/* <section className="translaiton-selection section bg-gray-100 dark:bg-inherit" id="translation-selection">
        <div className="container">
          <div className='flex justify-center items-center'>
            <p className='text-xl font-semibold bg-primary text-white px-5 py-2 rounded-l-md'>Translations</p>

            <Select 
              onValueChange={(value) => readMoreAndChangeLanguage(value)}
              value={lang}
            >
              <SelectTrigger className="w-[380px] !py-5 rounded-l-none">
                <SelectValue placeholder="Other translations" />
              </SelectTrigger>
              <SelectContent>
                {
                  translationsList.map((e, index) => (
                    <SelectItem value={e.identifier} className="capitalize font-semibold hover:!bg-emerald-500 hover:!text-white cursor-pointer" key={index}>
                      <span className='font-bold'>{index + 1} . </span>{e.name} <span className='font-medium'>({e.englishName}) : {e.language}</span>
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
        </div>
      </section> */}
      <TranslationSelect 
        value={lang}
        onChange={readMoreAndChangeLanguage}
        translationsList={translationsList}
      />

      {/* show surah */}
      <section className="show-surah section" id="show-surah">
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
                <Button className="w-full max-w-96 py-5 text-white" onClick={() => readMoreAndChangeLanguage(lang)}>Read more</Button>
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

      <ScrollToTop />

    </div>
  )
}

export default Read