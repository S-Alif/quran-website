import { dataFetcher } from "@/app/api/dataFetcher"
import Listen from "./listen.jsx"

export const metadata = {
  title: "Listen to recitation",
  description: "Qur\'An recitation by Shayks",
}

const fetchSurahList = async () => {
  let result = await dataFetcher("http://api.alquran.cloud/v1/surah")
  return result
}

const ListenAudio = async ({params, searchParams}) => {

  const surahList = await fetchSurahList()

  return (
    <Listen
      surahList={surahList} 
      reciterInfo={searchParams}
      identifier={params?.reciter}
    />
  )
}

export default ListenAudio