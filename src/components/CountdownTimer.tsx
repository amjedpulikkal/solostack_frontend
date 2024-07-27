import { useEffect, useState } from "react"


import { useToast } from "@/components/ui/use-toast";
import { Button } from "./ui/button";
type props = {

  endTime: Date
}

export function CountdownTimer({ endTime }: props): JSX.Element {
  const {toast} = useToast();

  const endMillis = endTime.getTime();
  const startMillis = new Date().getTime();

  const difference = endMillis - startMillis
  const isInvalid = endMillis < startMillis
  const hours = !isInvalid? Math.floor(difference / (1000 * 60 * 60)): 0
  const minutes =!isInvalid? Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)):0
  const seconds =!isInvalid? Math.floor((difference % (1000 * 60)) / 1000):0

  const [secondsRemaining, setSecondsRemaining] = useState(seconds)
  const [minutesRemaining, setMinutesRemaining] = useState(minutes)
  const [hoursRemaining, sethoursRemaining] = useState(hours)

  useEffect(() => {
    const timer = setInterval(() => {



      if (secondsRemaining > 0) {
        setSecondsRemaining((prevSeconds) => prevSeconds - 1);
      } else {
        if (minutesRemaining > 0) {

          setMinutesRemaining((prevMinute) => prevMinute - 1)
          setSecondsRemaining(60)
        } else {

          if (hoursRemaining > 0) {
            sethoursRemaining((prevHours) => prevHours - 1)
            setMinutesRemaining(60)
            setSecondsRemaining(60)
          }

        }

      }
    }, 1000);
    if (hoursRemaining === 0 && minutesRemaining === 0 && secondsRemaining === 0) {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <Button altText="Try again">Try again</Button>,
      })
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining, hoursRemaining, minutesRemaining,endMillis]);

  return (
    <p>-{hoursRemaining < 10 ? "0" + hoursRemaining||"0" : hoursRemaining||"0" }:{minutesRemaining < 10 ? "0" + minutesRemaining ||"00" : minutesRemaining ||"00"}:{secondsRemaining < 10 ? "0" + secondsRemaining ||"00": secondsRemaining ||"00"}</p>
  )

}