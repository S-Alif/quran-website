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

  const [formattedDate, setFormattedDate] = useState(formatDate(new Date(), "dd-mm-yyyy"))
  const [date, setDate] = useState(new Date())
  const [country, setCountry] = useState("Bangladesh")
  const [city, setCity] = useState("Chittagong")
  const [calendrData, setCalendarData] = useState(null)

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
    let result = await axios.get(`/api/calendar?date=${formattedDate}&city=${city}&country=${country}`)
    if(result == null || result?.data == null) return alert("Could not get calendar data")
    console.log(result?.data)
    setCalendarData(result?.data)
  }

  // load calendar data when anything changes
  useEffect(() => {
    getCalendarData()
  }, [formattedDate, country, city])

  const randomBg = useMemo(() => randomBgImage(), [])

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

    </div>
  )
}

export default CalendarPage