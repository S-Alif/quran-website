"use client";
import * as React from "react"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { format, setMonth } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select";
import { ArrowLeft, ArrowRight } from "lucide-react";

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {

  // render select items
  const selectItemRenderer = (itemArry, selectLabel) => {
    return (
      <>
        <SelectTrigger>{selectLabel}</SelectTrigger>
        <SelectContent>
          {
            itemArry.map((e, index) => (
              <SelectItem className="capitalize hover:!bg-emerald-500 hover:!text-white cursor-pointer" value={e.value} key={index}>
                {e.label}
              </SelectItem>
            ))
          }
        </SelectContent>
      </>
    )
  }

  return (
    (<DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col w-full font-medium",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-xl font-medium hidden",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-primary text-white p-0 opacity-50 hover:opacity-100 rounded-md hover:bg-primary hover:text-white"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex justify-between w-full",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-medium text-[0.8rem]",
        row: "flex w-full justify-between mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:border hover:border-blue-700 hover:bg-blue-700/50 hover:text-white"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-blue-700 text-primary-foreground hover:bg-blue-700 hover:text-primary-foreground focus:bg-blue-700 focus:text-primary-foreground",
        day_today: "!bg-primary text-white hover:!bg-primary hover:text-white",
        day_outside:
          "day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns: "flex gap-1",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ArrowLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ArrowRight className="h-4 w-4" />,
        Dropdown: (props) => {

          const {fromDate, fromMonth, fromYear, toDate, toMonth, toYear} = useDayPicker()
          const {goToMonth, currentMonth} = useNavigation()

          if(props?.name == "months"){
            const months = Array.from({length: 12}, (_, i) => ({
              value: i.toString(),
              label: format(setMonth(new Date(), i), "MMMM")
            }))
            
            return (
              <Select
                onValueChange={(e) => {
                  let newDate = new Date(currentMonth)
                  newDate.setMonth(parseInt(e))
                  goToMonth(newDate)
                }}
                value={props.value?.toString()}
              >
                {selectItemRenderer(months, format(currentMonth, "MMMM"))}
              </Select>
            )

          }else{
            const pastYears = fromYear || fromDate.getFullYear() || fromMonth.getFullYear()
            const latestYear = toYear || toDate.getFullYear() || toMonth.getFullYear()
            let years = []
            
            if(!pastYears && !latestYear) return

            const yearGap = latestYear - pastYears + 1
            years = Array.from({ length: yearGap }, (_, i) => ({
              value: (pastYears + i).toString(),
              label: (pastYears + i).toString(),
            }))

            return (
              <Select
                onValueChange={(e) => {
                  let newDate = new Date(currentMonth)
                  newDate.setFullYear(parseInt(e))
                  goToMonth(newDate)
                }}
                value={props.value?.toString()}
              >
                {selectItemRenderer(years, currentMonth.getFullYear())}
              </Select>
            )
          }
        }
      }}
      {...props} />)
  );
}
Calendar.displayName = "Calendar"

export { Calendar }
