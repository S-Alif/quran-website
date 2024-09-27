import { dataFetcher } from '@/api/dataFetcher'
import endpoints from '@/api/endpoints'
import React from 'react'
import Read from './read'

// fetch surah
const fetchSurah = async (num, language, offset, limit) => {
  const edition = 'quran-unicode'
  const result = await dataFetcher(
    `${endpoints.surahList}/${num}/editions/${edition},${language}?offset=${offset}&limit=${limit}`
  )
  return result
}

const ReadSurah = async ({ searchParams }) =>  {

  const num = searchParams?.number
  const language = searchParams?.lang || "en.asad"
  const offset = searchParams?.offset || 0
  const limit = searchParams?.limit || 10

  const surahWithTranslation = await fetchSurah(num, language, offset, limit)
  const { ayahs, englishName, englishNameTranslation, name, number, numberOfAyahs, revelationType } = surahWithTranslation[0]
  const translation = surahWithTranslation[1].ayahs
  const infoMap = {name, englishName, englishNameTranslation, number, numberOfAyahs, revelationType}

  return (
    <Read 
      englishName={englishName}
      infoMap={infoMap}
      ayahs={ayahs}
      numberOfAyahs={numberOfAyahs}
      offset={offset}
      limit={limit}
      translations={translation}
      language={language}
    />
  )
}

export default ReadSurah