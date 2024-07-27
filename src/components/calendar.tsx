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

  const modifiers = {
    specificDate: new Date(2024, 3, 10)
  };
  const handleDayClick:any = (day: Date) => {

    console.log(day)
    setDate(day);
  };
  const modifiersStyles = {
    specificDate: {
      backgroundColor: 'red',
      color: 'white',
    }
  };
  return (
    <Calendar disabled={isDayDisabled}
      mode="single"
      selected={date}
      modifiers={modifiers}
      onSelect={handleDayClick} 
      modifiersStyles={modifiersStyles}
      className="rounded-md border shadow "
    />
  )
}

function isWithinRange(date: Date, range: Date[] | { from: Date; to: Date }) {
  if (Array.isArray(range)) {
    
    return date >= range[0] && date <= range[1];
  } else {
      
    return date >= range.from && date <= range.to;
  }
}