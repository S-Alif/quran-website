'use client'

import PageHeader from '@/components/PageHeader'
import SurahInfoCard from '@/components/SurahInfoCard'
import TranslationSelect from '@/components/TranslationSelect'
import { randomBgImage } from '@/helpers/bgImage'
import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'

const Listen = ({ surahList, reciterInfo, identifier = 'ar.alafasy'}) => {

  const [surahNum, setSurahNum] = useState(1)
  const [audio, setAudio] = useState([])
  const [surahInfo, setSurahInfo] = useState(null)
  const [loading, setLoading] = useState(false)
  const [currentAyah, setCurrentAyah] = useState(0)

  const audioRef = useRef()

  // load audio
  useEffect(() => {
    (async () => {
      setLoading(false)
      let result = await axios.get(`/api/get-surah?number=${surahNum}&identifier=${identifier}`)
      if(result == null) return alert("Could not fetch surah audio")
      setCurrentAyah(0)
      let { ayahs, englishName, englishNameTranslation, name, number, numberOfAyahs, revelationType } = result.data
      setAudio(ayahs)
      setSurahInfo({ name, englishName, englishNameTranslation, number, numberOfAyahs, revelationType })
    })()
  }, [surahNum])


  const nextAyah = () => {
    if (currentAyah < audio.length - 1) {
      setCurrentAyah(currentAyah + 1)
    }
  }

  const prevAyah = () => {
    if (currentAyah > 0) {
      setCurrentAyah(currentAyah - 1)
    }
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load()
      audioRef.current.play()
    }
  }, [currentAyah])


  return (
    <div className='listen-audio-page' id='listen-audio-page'>

      {/* page header */}
      <PageHeader
        headline={"Surah recitation by Shaykh " + reciterInfo?.englishName}
        bgImage={randomBgImage()}
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
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-3">

            <div className="surah-info order-2 lg:order-2">
              <h3 className='title text-primary'>Surah information</h3>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                {
                  surahInfo != null &&
                  Object.keys(surahInfo).map((e, index) => (
                    <SurahInfoCard infoName={e} infoValue={surahInfo[e]} key={index} />
                  ))
                }
              </div>
            </div>

            <div className="surah-audio-player order-1 lg:order-2">
              {audio.length > 0 && (
                <div>
                  <h4 className="text-primary">Ayah {currentAyah + 1}: {audio[currentAyah].text}</h4>
                  <audio
                    ref={audioRef}
                    controls
                    onEnded={() => {
                      if (currentAyah == surahInfo?.numberOfAyahs - 1){
                        if(surahNum < 114) return setSurahNum(prev => prev + 1)
                        return setSurahNum(1)
                      }
                      setCurrentAyah(prev => prev + 1)
                    }} 
                  >
                    <source src={audio[currentAyah].audio} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>
                  <div className="audio-controls">
                    <button onClick={prevAyah} disabled={currentAyah === 0}>
                      Previous
                    </button>
                    <button onClick={nextAyah} disabled={currentAyah === audio.length - 1}>
                      Next
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      

    </div>
  )
}

export default Listen