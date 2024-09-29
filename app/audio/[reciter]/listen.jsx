import PageHeader from '@/components/PageHeader'
import SurahInfoCard from '@/components/SurahInfoCard'
import { randomBgImage } from '@/helpers/bgImage'
import React from 'react'

const Listen = ({surahList, reciterInfo}) => {
  return (
    <div className='listen-audio-page' id='listen-audio-page'>

      {/* page header */}
      <PageHeader
        headline={"Surah recitation by " + reciterInfo?.englishName}
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
            title: reciterInfo?.englishName,
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

    </div>
  )
}

export default Listen