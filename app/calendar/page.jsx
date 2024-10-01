'use client'

import PageHeader from '@/components/PageHeader'
import { randomBgImage } from '@/helpers/bgImage'
import { useEffect, useMemo, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Calendar } from '@/components/ui/calendar'
import { format, formatDate } from 'date-fns'
import axios from 'axios'
import SurahInfoCard from '@/components/SurahInfoCard'
import CardLoader from '@/components/CardLoader'
import { formatInTimeZone } from 'date-fns-tz'

// zod form schema
const formSchema = z.object({
  userCountry: z.string().min(3, {
    message: "Country must be at least 3 characters",
  }),
  userCity: z.string().min(3, {
    message: "City name must be at least 3 characters"
  })
})


const CalendarPage = () => {

  const [formattedDate, setFormattedDate] = useState("")
  const [date, setDate] = useState()
  const [country, setCountry] = useState("Bangladesh")
  const [city, setCity] = useState("Chittagong")
  const [calendrData, setCalendarData] = useState(null)
  const [prayerTimes, setPrayerTimes] = useState(null)
  const [importantTimes, setImportantTimes] = useState(null)
  const [loading, setLoading] = useState(false)

  // react hook form declare with zod
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userCountry: "Bangladesh",
      userCity: "Chittagong",
    },
  })

  // form submit
  const onSubmit = (values) => {
    setCity(values?.userCity)
    setCountry(values?.userCountry)
  }

  // get calendar data
  const getCalendarData = async () => {
    setLoading(true)
    let result = await axios.get(`/api/calendar?date=${formattedDate}&city=${city}&country=${country}`)
    if(result == null || result?.data == null) return alert("Could not get calendar data")
    setCalendarData(result?.data)

    let { Fajr, Sunrise, Dhuhr, Asr, Sunset, Maghrib, Isha, Imsak, Midnight, Firstthird, Lastthird } = result?.data?.timings

    setPrayerTimes({Fajr, Dhuhr, Asr, Maghrib, Isha})
    setImportantTimes({Sunrise, Sunset, Imsak, Midnight, Firstthird, Lastthird})
    setLoading(false)
  }

  // load calendar data state variables
  useEffect(() => {
    setFormattedDate(formatDate(new Date(), "dd-mm-yyyy"))
    setDate(new Date())
  }, [])

  // load calendar data when anything changes
  useEffect(() => {
    if(formattedDate.trim() == "") return
    getCalendarData()
  }, [formattedDate, country, city])

  const randomBg = useMemo(() => randomBgImage(), [])

  // loader renderer
  const renderLoader = () => {
    return(
      <>
        <CardLoader />
        <CardLoader />
        <CardLoader />
      </>
    )
  }

  // time converter
  const convertToTimezone = (timeStr, timezone) => {
    const [hours, minutes] = timeStr.split(':').map(Number)
    const dateTime = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes)
    return formatInTimeZone(dateTime, timezone, "hh:mm a")
  }

  return (
    <div className='calendar-page' id='calendar-page'>

      {/* page header */}
      <PageHeader
        headline={"Islamic calendar"}
        bgImage={randomBg}
        breadCrumbList={[
          {
            title: "Home",
            href: "/"
          },
          {
            title: "Calendar",
            href: "/calendar"
          }
        ]}
      />

      {/* take user info */}
      <section className="user-location-form section" id="user-location-form">
        <div className="container">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-11 md:gap-3 lg:gap-6">

            {/* location form */}
            <div className="location-form-wrapper">
              <h3 className='title text-primary'>Set your location</h3>

              <div className="location-form mt-2">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                      control={form.control}
                      name="userCountry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Country</FormLabel>
                          <FormControl>
                            <Input placeholder="You country" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="userCity"
                      render={({ field }) => (
                        <FormItem className="!mt-5">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="You city / village" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" size="lg">Submit</Button>
                  </form>
                </Form>
              </div>
            </div>

            {/* calendar */}
            <div className="calendar-wrapper">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(e) => {
                  let validDate = new Date(e)

                  if (isNaN(validDate.getTime())) {
                    console.error('Invalid date')
                    return
                  }
                  setFormattedDate(format(validDate, 'dd-MM-yyyy'))
                  setDate(e)
                }}
                className="rounded-md border !w-full"
                captionLayout="dropdown-buttons"
                fromYear={1990}
                toYear={2057}
              />
            </div>

          </div>
        </div>
      </section>

      {/* show dates */}
      <section className="show-calendar-dates section bg-gray-100 dark:bg-inherit" id="show-calendar-data">
        <div className="container">

          <h3 className='title text-center text-primary'>Date</h3>
          <div className="dates grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">

            {
              (!loading && calendrData != null) &&
              <>
                <SurahInfoCard
                  label={"Date"}
                  infoValue={calendrData?.date?.gregorian?.date}
                />
                <SurahInfoCard
                  label={"Hijri date"}
                  infoValue={calendrData?.date?.hijri?.date}
                />
                <SurahInfoCard
                  label={"Hijri week (En)"}
                  infoValue={calendrData?.date?.hijri?.weekday?.en}
                />
                <SurahInfoCard
                  label={"Hijri week (Ar)"}
                  infoValue={calendrData?.date?.hijri?.weekday?.ar}
                />
                <SurahInfoCard
                  label={"Hijri month (En)"}
                  infoValue={calendrData?.date?.hijri?.month?.en}
                />
                <SurahInfoCard
                  label={"Hijri month (Ar)"}
                  infoValue={calendrData?.date?.hijri?.month?.ar}
                />
                <SurahInfoCard
                  label={"Timezone"}
                  infoValue={calendrData?.meta?.timezone}
                />
              </>
            }

            {
              loading && renderLoader()
            }

          </div>
        </div>
      </section>

      {/* show prayer times */}
      <section className="show-prayer-times section" id="show-prayer-times">
        <div className="container">
          <h3 className='title text-center text-primary'>Prayer times</h3>

          <div className="prayer-times grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {
              (!loading && prayerTimes != null) &&
              Object.keys(prayerTimes).map((e, index) => (
                <SurahInfoCard 
                  label={e}
                  infoValue={convertToTimezone(prayerTimes[e], calendrData?.meta?.timezone)}
                  key={index}
                />
              ))
            }
            {
              loading && renderLoader()
            }
          </div>

        </div>
      </section>

      {/* show important times */}
      <section className="show-important-times section bg-gray-100 dark:bg-inherit" id="show-important-times">
        <div className="container">

          <h3 className='title text-center text-primary'>Other important times</h3>
          <div className="important-times grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {
              (!loading && importantTimes != null) &&
              Object.keys(importantTimes).map((e, index) => {
                let label = e
                if (label == "Firstthird" || label == "Lastthird"){
                  label = label.split('third')[0] + " third"
                }

                return(
                  <SurahInfoCard
                    label={label}
                    infoValue={convertToTimezone(importantTimes[e], calendrData?.meta?.timezone)}
                    key={index}
                  />
                )
              })
            }
            {
              loading && renderLoader()
            }
          </div>
        </div>
      </section>

    </div>
  )
}

export default CalendarPage