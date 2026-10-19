import Card from "./Card"
import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import WeatherIcon from "../WeatherIcon"
import type { Coords } from "../../types"

type Props = {
  coords: Coords
}

export default function HourlyForecast({coords}:Props) {
  const {data}=useSuspenseQuery({
    queryKey:['weather', coords],
    queryFn:()=>getWeather({lat:coords.lat, lon:coords.lon})
  })
  if(!data) return;
  return (
    <Card
      title="Hourly Forecast (48 Hours)"
      childrenClassName="flex gap-6 overflow-x-scroll"
    >
      {data.forecast.forecastday[0].hour.map((hour, index) => (
        <div
          key={index}
          className="flex flex-col 2xl:justify-between gap-2 items-center p-2"
        >
          <p className="whitespace-nowrap 2xl:scale-110">
            {new Date(hour.time).toLocaleTimeString(undefined, {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            })}
          </p>
           <WeatherIcon src={hour.condition.icon}/>
          <p className="2xl:scale-110">{Math.round(hour.temp_f)}°F</p>
        </div>
      ))}
    </Card>
  )
}