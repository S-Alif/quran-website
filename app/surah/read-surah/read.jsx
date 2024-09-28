'use client'

import AyahText from '@/components/AyahText'
import CardLoader from '@/components/CardLoader'
import PageHeader from '@/components/PageHeader'
import ScrollToTop from '@/components/ScrollToTop'
import SurahInfoCard from '@/components/SurahInfoCard'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from '@/components/ui/select'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function Read({ englishName, language, infoMap, ayahs = [], numberOfAyahs, offset, limit, translations = [], translationsList = []}) {

  const [currentAyahs, setCurrentAyahs] = useState(ayahs)
  const [currentTranslations, setCurrentTranslations] = useState(translations)
  const [pageOffset, setPageOffset] = useState(offset)
  const [lang, setLang] = useState(language || "en.asad")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

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
      newOffset = newOffset - 1
      let url = `/api/surah?number=${infoMap.number}&lang=${laguageValue}&offset=${1}&limit=${offset * 10}`
      let pageUrl = `/surah/read-surah?number=${infoMap.number}&lang=${laguageValue}&offset=${1}&limit=${offset * 10}`

      await fetchData(url, pageUrl, newOffset, languageChanged)
      return
    }
    
    if((offset * limit) >= numberOfAyahs) return
    let url = `/api/surah?number=${infoMap.number}&lang=${language}&offset=${newOffset}&limit=${10}`
    let pageUrl = `/surah/read-surah?number=${infoMap.number}&lang=${language}&offset=${newOffset}&limit=${10}`
    await fetchData(url, pageUrl, newOffset, languageChanged)
  }

  // page header background images
  const bgImageArray = [
    "https://images.unsplash.com/photo-1609665661849-11b00109da97?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1620367274821-be34135cfd22?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1610388549158-cb214541f30c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1602411529062-5e19452ee26a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1650083731680-9658df904125?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1649297711865-3d7c4de3610f?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ]


  return (
    <div className='read-surah-page'>

      {/* page header */}
      <PageHeader
        headline={"Read surah " + englishName}
        bgImage={bgImageArray[Math.floor(Math.random() * bgImageArray.length)]}
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
      <section className="translaiton-selection section bg-gray-100 dark:bg-inherit" id="translation-selection">
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
      </section>

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
                <Button className="w-full max-w-96 py-5" onClick={() => readMoreAndChangeLanguage(lang)}>Read more</Button>
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