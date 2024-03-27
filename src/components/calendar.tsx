import * as React from "react"

import { Calendar } from "@/components/ui/calendar"


export function CalendarDemo() {
  const [date, setDate] = React.useState<Date | undefined>(new Date())
 
  const enabledRanges = [
    [new Date(2024, 3, 10), new Date(2024, 3, 12)],
    [new Date(2024, 3, 20), new Date(2024, 3, 25)],
    { from: new Date(2024, 4, 18), to: new Date(2024, 4, 29) }
  ];

  const isDayDisabled = (day: Date) => {
    
    return !enabledRanges.some(range => isWithinRange(day, range));
  };

  
  const handleDayClick = (day: Date) => {

    console.log(day)
    setDate(day);
  };
  
  return (
    <Calendar disabled={isDayDisabled}
      mode="single"
      selected={date}
      onSelect={handleDayClick} 
      className="rounded-md border shadow "
    />
  )
}

function isWithinRange(date: Date, range: Date[] | { from: Date; to: Date }) {
  if (Array.isArray(range)) {
    // Check if the date is within a simple date range
    return date >= range[0] && date <= range[1];
  } else {
    // Check if the date is within a date range object
    return date >= range.from && date <= range.to;
  }
}