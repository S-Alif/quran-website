import { useState } from 'react'
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from './ui/select'

const TranslationSelect = ({value, onChange, translationsList = []}) => {

  const [language, setLanguage] = useState(value || "en.asad")

  return (
    <section className="translaiton-selection section bg-gray-100 dark:bg-inherit" id="translation-selection">
      <div className="container">
        <div className='flex justify-center items-center'>
          <p className='text-xl font-semibold bg-primary text-white px-5 py-2 rounded-l-md'>Translations</p>

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
                translationsList.map((e, index) => (
                  <SelectItem value={e.identifier} className="capitalize font-semibold hover:!bg-emerald-500 hover:!text-white cursor-pointer" key={index}>
                    <span className='font-bold'>{index + 1} . </span>{e.name} <span className='font-medium'>({e.englishName}) : {e.language}</span>
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