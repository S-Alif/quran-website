import { dataFetcher } from '@/app/api/dataFetcher'
import endpoints from '@/app/api/endpoints'
import React from 'react'
import Read from './read'

// fetch juz
const fetchJuz = async (num) => {
  const edition = 'quran-unicode'
  const result = await dataFetcher(`${endpoints.juzList}/${num}/${edition}`)
  return result
}
// fetch juz
const fetchJuzTranslation = async (num, language) => {
  const result = await dataFetcher(`${endpoints.juzList}/${num}/${language}`)
  return result
}

// fetch translations
const getTranslationList = async () => {
  let list = await dataFetcher(endpoints.translationList)
  return list
}

const ReadJuz = async ({ searchParams }) => {

  const num = searchParams?.number
  const language = searchParams?.lang || "en.asad"

  const surahWithTranslation = await fetchJuz(num)
  const { number, ayahs, surahs } = surahWithTranslation
  const translation = await fetchJuzTranslation(num, language)
  const infoMap = surahs

  const translationList = await getTranslationList()

  return (
    <Read
      juzNumber={number}
      infoMap={infoMap}
      ayahs={ayahs}
      numberOfAyahs={ayahs.length}
      translations={translation?.ayahs}
      language={language}
      translationsList={translationList}
    />
  )
}

export default ReadJuz