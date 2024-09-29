import { dataFetcher } from "@/app/api/dataFetcher"
import Listen from "./listen"

const fetchSurahList = async (reciter) => {
  let result = await dataFetcher("http://api.alquran.cloud/v1/surah")
  return result
}

const ListenAudio = async ({params, searchParams}) => {

  const surahList = await fetchSurahList(params?.reciter)

  return (
    <Listen surahList={surahList} reciterInfo={searchParams} />
  )
}

export default ListenAudio