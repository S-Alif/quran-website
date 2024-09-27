'use client'

import { dataFetcher } from '@/api/dataFetcher'
import endpoints from '@/api/endpoints'
import PageHeader from '@/components/PageHeader'
import SurahInfoCard from '@/components/SurahInfoCard'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const ReadSurah = async () =>  {

  const searchParams = useSearchParams()
  const num = searchParams.get('number')
  const language = searchParams.get('lang')
  const offset = searchParams.get('offset')
  const limit = searchParams.get('limit')
  const edition = "quran-unicode"

  // fetch surah
  const fetchSurah = async () => {
    let result = dataFetcher(endpoints.surahList + `/${num}/editions/${edition},${language}?offset=${offset}&limit=${limit}`)
    return result
  }

  const surahWithTranslation = await fetchSurah()
  console.log(surahWithTranslation)
  const { ayahs, englishName, englishNameTranslation, name, number, numberOfAyahs, revelationType } = surahWithTranslation[0]
  const translation = surahWithTranslation[1].ayahs
  const infoMap = {name, englishName, englishNameTranslation, number, numberOfAyahs, revelationType}

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
                <SurahInfoCard infoName={e} infoValue={infoMap[e]} key={index}  />
              ))
            }
          </div>
        </div>
      </section>

      {/* show surah */}
      <section className="show-surah section bg-gray-100" id="show-surah">
        <div className="container">
          <h3 className='title text-center text-primary font-arabic font-bold'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h3>
        </div>
      </section>

    </div>
  )
}

export default ReadSurah