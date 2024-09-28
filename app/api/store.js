import { create } from "zustand"
import { dataFetcher } from "./dataFetcher"
import endpoints from "./endpoints"


const fetchStore = create((set) => ({

  translationList: null,
  surahList: null,
  audioList: null,
  quranEdition: "quran-unicode",

  fetchTranslationList: async () => {
    let data = await dataFetcher(endpoints.translationList)
    set({translationList: data})
  },
  fetchSurahList: async () => {
    let data = await dataFetcher(endpoints.surahList)
    set({ surahList: data})
  },
  fetchAudioList: async () => {
    let data = await dataFetcher(endpoints.audioList)
    set({ audioList: data})
  },

}))

export default fetchStore