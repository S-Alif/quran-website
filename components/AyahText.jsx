import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { buttonVariants } from './ui/button'

const AyahText = ({ayah, translation, ayahNumber}) =>  {
  return (
    <Card className="hover:border-transparent dark:border-gray-400 hover:shadow-xl transition-shadow duration-300 mb-4">
      <CardHeader>
        <CardTitle className={"p-3 bg-primary text-white rounded-md max-w-11 max-h-11 text-center"}>
          {ayahNumber}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className='font-arabic text-4xl font-bold pb-3 text-end'>{ayah}</p>
        {translation && <p className='text-xl pt-2 border-t'>{translation}</p>}
      </CardContent>
    </Card>
  )
}

export default AyahText