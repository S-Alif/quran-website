import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

const AyahText = ({ayah, translation, ayahNumber, numberInSurah = null}) =>  {
  return (
    <Card className="hover:border-transparent dark:border-gray-400 hover:shadow-xl transition-shadow duration-300 mb-4">
      <CardHeader className="flex !flex-row gap-3">
        <CardTitle className={"p-3 bg-primary text-white rounded-md w-fit max-h-11 text-center"}>
          {ayahNumber}
        </CardTitle>
        {numberInSurah && <p>{numberInSurah}</p>}
      </CardHeader>

      <CardContent>
        <p className='font-arabic text-4xl font-bold pb-3 text-end leading-loose'>{ayah}</p>
        {translation && <p className='text-xl pt-2 border-t leading-relaxed'>{translation}</p>}
      </CardContent>
    </Card>
  )
}

export default AyahText