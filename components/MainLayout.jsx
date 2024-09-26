'use client'

import Navbar from './Navbar'
import fetchStore from '@/api/store'

function MainLayout({children}) {

  const { fetchTranslationList, fetchSurahList, fetchAudioList, translationList, surahList, audioList } = fetchStore()

  const fetchLists = async () => {
    if (translationList && surahList && audioList) return

    await Promise.all([
      fetchSurahList(),
      fetchTranslationList(),
      fetchAudioList()
    ])
  }

  fetchLists()


  return (
    <div>
      <Navbar />
      <main>
        {children}
      </main>
    </div>
  )
}

export default MainLayout