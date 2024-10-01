import React from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card'

const SurahInfoCard = ({infoName, infoValue, label}) => {
  return (
    <Card className="hover:border-transparent hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <CardTitle className="text-sm font-semibold">
          {infoName == "name" && "Name"}
          {infoName == "englishName" && "English name"}
          {infoName == "englishNameTranslation" && "Translation"}
          {infoName == "number" && "Number"}
          {infoName == "numberOfAyahs" && "Ayahs"}
          {infoName == "revelationType" && "Revelation"}
          {label && label}
        </CardTitle>
        <CardDescription 
          className={`font-medium text-xl 
          ${infoName == "name" && "font-arabic font-bold text-2xl"} 
          ${label && label.includes("Ar") && "font-arabic font-bold text-2xl"}`}>{infoValue}</CardDescription>
      </CardHeader>
    </Card>
  )
}

export default SurahInfoCard