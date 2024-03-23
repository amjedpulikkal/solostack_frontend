import { useEffect, useState } from "react"
import { toast } from "sonner";

type props = {

  endTime: Date
}

export function CountdownTimer({ endTime }: props): JSX.Element {


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
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [secondsRemaining, hoursRemaining, minutesRemaining]);

  return (
    <p>-{hoursRemaining < 10 ? "0" + hoursRemaining : hoursRemaining}:{minutesRemaining < 10 ? "0" + minutesRemaining : minutesRemaining}:{secondsRemaining < 10 ? "0" + secondsRemaining : secondsRemaining}</p>
  )

}