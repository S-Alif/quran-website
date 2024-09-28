import { dataFetcher } from '@/app/api/dataFetcher'
import endpoints from '@/app/api/endpoints'
import React from 'react'
import Read from './read'

// fetch surah
const fetchSurah = async (num, language, offset, limit) => {
  const edition = 'quran-unicode'
  const result = await dataFetcher(
    `${endpoints.surahList}/${num}/editions/${edition},${language}?offset=${(offset-1) * limit}&limit=${limit}`
  )
  return result
}

// fetch translations
const getTranslationList = async () => {
  let list = await dataFetcher(endpoints.translationList)
  return list
}

const ReadSurah = async ({ searchParams }) =>  {

  const num = searchParams?.number
  const language = searchParams?.lang || "en.asad"
  const offset = searchParams?.offset || 1
  const limit = searchParams?.limit || 10

  const surahWithTranslation = await fetchSurah(num, language, offset, limit)
  const { ayahs, englishName, englishNameTranslation, name, number, numberOfAyahs, revelationType } = surahWithTranslation[0]
  const translation = surahWithTranslation[1].ayahs
  const infoMap = {name, englishName, englishNameTranslation, number, numberOfAyahs, revelationType}

  const translationList = await getTranslationList()

  return (
    <Read 
      englishName={englishName}
      infoMap={infoMap}
      ayahs={ayahs}
      numberOfAyahs={numberOfAyahs}
      offset={parseInt(offset)}
      limit={limit}
      translations={translation}
      language={language}
      translationsList={translationList}
    />
  )
}

export default ReadSurah