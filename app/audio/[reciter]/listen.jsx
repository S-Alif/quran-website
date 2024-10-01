'use client'

import PageHeader from '@/components/PageHeader'
import SurahInfoCard from '@/components/SurahInfoCard'
import TranslationSelect from '@/components/TranslationSelect'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { randomBgImage } from '@/helpers/bgImage'
import axios from 'axios'
import { Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'


const Listen = ({ surahList, reciterInfo, identifier = 'ar.alafasy'}) => {

  const [surahNum, setSurahNum] = useState(1)
  const [surah, setSurah] = useState([])
  const [audio, setAudio] = useState([])
  const [surahInfo, setSurahInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)

  // audio ref to control audio element
  const audioRef = useRef()
  const ayahScrollRef = useRef(null)
  const ayahRefs = useRef([])

  // load audio
  useEffect(() => {
    (async () => {
      setLoading(false)
      let [surah, audio] = await Promise.all([
        axios.get(`/api/get-surah?number=${surahNum}`),
        axios.get(`/api/get-surah/audio?number=${surahNum}&edition=${identifier}`)
      ])
      if(surah == null || surah?.data == null || audio == null || audio?.data == null) return alert("Could not fetch surah audio")
      let { ayahs, englishName, englishNameTranslation, name, number, numberOfAyahs, revelationType } = surah.data
      setSurah(ayahs)
      setCurrentAyah(0)
      setSurahInfo({ name, englishName, englishNameTranslation, number, numberOfAyahs, revelationType })
      setAudio(audio.data?.ayahs)
    })()
  }, [surahNum])


  // go to next ayah
  const nextAyah = () => {
    if (currentAyah < audio.length - 1) {
      setCurrentAyah(currentAyah + 1)
    }
  }
  
  // go to previous ayah
  const prevAyah = () => {
    if (currentAyah > 0) {
      setCurrentAyah(currentAyah - 1)
    }
  }

  const randomBg = useMemo(() => randomBgImage(), [])

  // scroll to the ayahs that is playing
  useEffect(() => {
    if (surah.length == 0 || audio.length == 0) return
    const currentAyahElement = ayahRefs.current[currentAyah]
    const scrollArea = ayahScrollRef.current

    if (currentAyahElement && scrollArea) {
      let ayahPosition = currentAyahElement.offsetTop
      scrollArea.scrollTo({
        top: ayahPosition - 100,
        behavior: 'smooth',
        duration: 500
      })
    }

  }, [currentAyah])


  return (
    <div className='listen-audio-page' id='listen-audio-page'>

      {/* page header */}
      <PageHeader
        headline={"Surah recitation by Shaykh " + reciterInfo?.englishName}
        bgImage={randomBg}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Audio",
            href: "/audio"
          },
          {
            title: "Shaykh " + reciterInfo?.englishName,
            href: "#"
          }
        ]}
      />

      {/* reciter info */}
      <section className="reciter-info section">
        <div className="container">

          <h3 className='title text-center text-primary'>Reciter information</h3>

          {/* display cards */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 pt-4 gap-3">
            {
              reciterInfo != null &&
              Object.keys(reciterInfo).map((e, index) => (
                <SurahInfoCard infoName={e} infoValue={reciterInfo[e]} key={index} />
              ))
            }
          </div>

        </div>
      </section>

      {/* surah list */}
      <TranslationSelect
        value={surahNum}
        onChange={setSurahNum}
        isSurah={true}
        list={surahList}
      />

      {/* surah audio */}
      <section className="surah-audio section" id="surah-audio">
        <div className="container">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-5">

            <div className="surah-info">
              <h3 className='title text-primary text-center md:text-start'>Surah information</h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {
                  surahInfo != null &&
                  Object.keys(surahInfo).map((e, index) => (
                    <SurahInfoCard infoName={e} infoValue={surahInfo[e]} key={index} />
                  ))
                }
              </div>
            </div>

            <div className="surah-audio-player">
              <h3 className='title text-primary text-center md:text-start'>Surah audio</h3>

              <div className='ayah-texts h-auto w-full mb-4'>
                <ScrollArea 
                  className="wrapper max-h-[400px] lg:max-h-[300px] w-full border rounded-md px-3 pt-3 overflow-y-scroll overflow-x-hidden"
                  ref={ayahScrollRef}
                >
                  <h3 className='title text-center text-primary font-arabic font-bold'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h3>

                  {
                    (surah != null && surah.length > 0) &&
                    surah.map((e, index) => (
                      <Card 
                        className={`hover:border-transparent dark:border-gray-400 hover:shadow-xl transition-shadow duration-300 mb-4 ${e.numberInSurah - 1 == currentAyah && "bg-primary"}`} 
                        key={index}
                        ref={el => ayahRefs.current[index] = el}
                      >
                        <CardHeader className='px-4 pb-2 pt-3'>
                          <CardTitle className={"p-3 bg-primary text-white rounded-md w-fit max-h-11 border-2 border-white text-center"}>
                            {e.numberInSurah}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="!px-4 pb-3">
                          <p className={`font-arabic text-3xl font-bold text-end leading-normal  ${e.numberInSurah - 1 == currentAyah && "text-white"}`}>{e.text}</p>
                        </CardContent>
                      </Card>
                    ))
                  }
                </ScrollArea>
              </div>

              {/* customized react-h5 audio player */}
              {
                (audio != null && audio.length > 0) &&
                <AudioPlayer
                  ref={audioRef}
                  autoPlay
                  src={audio[currentAyah]?.audio}
                  onPlay={e => {
                    audioRef.current.audio.current.currentTime = 0
                  }}
                  onEnded={() => {
                    if (currentAyah == surahInfo?.numberOfAyahs - 1) {
                      if (surahNum < 114) return setSurahNum(prev => prev + 1)
                      return setSurahNum(1)
                    }
                    setCurrentAyah(prev => prev + 1)
                  }}
                  onClickNext={nextAyah}
                  onClickPrevious={prevAyah}
                  showJumpControls={false}
                  showSkipControls={true}
                  showFilledVolume={true}
                  loop={false}
                  layout='horizontal'
                  customIcons={{
                    previous: <SkipBack className='text-white' />,
                    next: <SkipForward className='text-white' />,
                    play: <Play className='text-white' />,
                    pause: <Pause className='text-white' />,
                    volume: <Volume2 className='text-white' />,
                    volumeMute: <VolumeX className='text-white' />
                  }}
                />
              }
            </div>

          </div>
        </div>
      </section>
      

    </div>
  )
}

export default Listen