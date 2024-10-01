import { useEffect, useState } from 'react'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from './ui/select'

const TranslationSelect = ({value, onChange, list = [], isSurah = false}) => {

  const [language, setLanguage] = useState(value || isSurah ? 1 : "en.asad")
  
  useEffect(() => {
    setLanguage(value)
  }, [value])

  return (
    <section className="translaiton-selection section bg-gray-100 dark:bg-zinc-900" id="translation-selection">
      <div className="container">
        <div className='flex justify-center items-center'>
          <p className='text-xl font-semibold bg-primary text-white px-5 py-2 rounded-l-md'>{isSurah ? "Surah" : "Translations"}</p>

          <Select
            onValueChange={(value) => {
              setLanguage(value)
              onChange(value)
            }}
            value={language}
          >
            <SelectTrigger className="w-[380px] !py-5 rounded-l-none">
              <SelectValue placeholder="Other translations" />
            </SelectTrigger>
            <SelectContent>
              {
                (!isSurah && list != null && list.length > 0) &&
                list.map((e, index) => (
                  <SelectItem value={e.identifier} className="capitalize font-semibold hover:!bg-emerald-500 hover:!text-white cursor-pointer" key={index}>
                    <span className='font-bold'>{index + 1} . </span>{e.name} <span className='font-medium'>({e.englishName}) : {e.language}</span>
                  </SelectItem>
                ))
              }

              {/* for surah list */}
              {
                (isSurah && list != null && list.length > 0) &&
                list.map((e, index) => (
                  <SelectItem value={e.number} className="capitalize font-semibold hover:!bg-emerald-500 hover:!text-white cursor-pointer" key={index}>
                    <span className='font-bold'>{index + 1} . </span>{e.name} <span className='font-medium'>({e.englishName})</span>
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        </div>
      </div>
    </section>
  )
}

export default TranslationSelect