import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const CardLoader = () => {
  return (
    <Card className="hover:border-transparent dark:border-gray-400 hover:shadow-xl transition-shadow duration-300 mb-4">
      <CardHeader className="animate-pulse">
        <CardTitle className={"px-3 py-5 bg-primary text-white rounded-md max-w-11 max-h-11 text-center"}></CardTitle>
      </CardHeader>

      <CardContent className="animate-pulse">
        <div className='font-arabic text-4xl h-12 font-bold pb-3 text-end bg-emerald-400 mb-3 rounded-md'></div>
        <div className='text-xl pt-2 mt-2 h-12 border-t bg-emerald-400 rounded-md'></div>
      </CardContent>
    </Card>
  )
}

export default CardLoader