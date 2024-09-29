import AyahText from "./AyahText"
import CardLoader from "./CardLoader"
import { Button } from "./ui/button"


const DisplayAyahs = ({
  currentAyahs = [],
  currentTranslations = [],
  numberOfAyahs,
  pageOffset, limit, loading = false, 
  readMoreAndChangeLanguage, lang, 
  juzpage = false
}) => {

  return (
    <section className="show-surah section" id="show-surah">
      <div className="container">
        <h3 className='title text-center text-primary font-arabic font-bold'>بِسْمِ ٱللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h3>

        <div className="show-surah-text pt-4">
          {
            (currentAyahs != null && currentAyahs.length > 0) &&
            currentAyahs.map((e, index) => (
              <AyahText
                ayah={e.text}
                ayahNumber={juzpage ? e.number : e.numberInSurah}
                translation={currentTranslations[index].text}
                key={index}
                numberInSurah={juzpage ? e.surah?.englishName + " : " + e.numberInSurah : null}
              />
            ))
          }
        </div>

        {
          ((pageOffset * limit) < numberOfAyahs && !loading) &&
          <div className='pt-5 text-center'>
            <Button className="w-full max-w-96 py-5 text-white" onClick={() => readMoreAndChangeLanguage(lang)}>Read more</Button>
          </div>
        }

        {
          loading &&
          <>
            <CardLoader />
            <CardLoader />
            <CardLoader />
          </>
        }
      </div>
    </section>
  )
}

export default DisplayAyahs