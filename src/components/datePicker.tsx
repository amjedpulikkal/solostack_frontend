"use client"

import * as React from "react"
import { FaRegCalendarAlt } from "react-icons/fa"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { SelectSingleEventHandler } from "react-day-picker"


type props={
  date: Date,
  setDate: React.Dispatch<React.SetStateAction<Date>>
}
export function   DatePickerDemo({date,setDate}:props) {

  return (
    <Popover >
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <FaRegCalendarAlt className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(setDate as SelectSingleEventHandler)}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
