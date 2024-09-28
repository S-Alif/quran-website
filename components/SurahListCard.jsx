import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card'
import Link from 'next/link'
import { buttonVariants } from './ui/button'


function SurahListCard({surahListItem}) {

  return (
    <Card className="hover:border-transparent hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="text-center">
        <CardTitle className="font-arabic text-3xl">{surahListItem?.name}</CardTitle>
        <CardDescription className="font-semibold text-xl">{surahListItem?.englishName}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p>{surahListItem?.englishNameTranslation}</p>
        <p>{surahListItem?.revelationType}</p>
        <p>{surahListItem?.numberOfAyahs} ayahs</p>
      </CardContent>
      <CardFooter>
        <Link 
          href={{ 
            pathname: "/surah/read-surah", 
            query:{
              number: surahListItem?.number,
              lang: "en.asad",
              offset: "1",
              limit: 10,
            }
          }}
          className={buttonVariants({ variant: "default" }) + " mx-auto"}>
            Read surah
          </Link>
      </CardFooter>
    </Card>
  )
}

export default SurahListCard