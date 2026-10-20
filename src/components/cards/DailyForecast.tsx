
import Card from "./Card";
import WeatherIcon from "../WeatherIcon";
import type { Coords } from "../../types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getWeather } from "../../api";

type Props = {
  coords: Coords;
  location:string;
}

export default function DailyForecast({coords, location}: Props) {
const {data}=useSuspenseQuery({
    queryKey:['weather', coords, location],
    queryFn:()=>getWeather({lat:coords.lat, lon:coords.lon, location})
  })

  
    return (
        <Card
      title="Daily Forecast"
      childrenClassName="flex flex-col gap-4 pb-6"
    >
      {data?.forecast?.forecastday.map((day, index) => (
        <div key={index} className="flex justify-between items-center">
          <p className="w-9">
            {new Date(day.date).toLocaleDateString(undefined, {
              weekday: "short",
            })}
          </p>
          <WeatherIcon src={day.day.condition.icon}/>
          <p>{Math.round(day.day.avgtemp_f)}°F</p>
          <p className="text-gray-500/75">{Math.round(day.day.mintemp_f)}°F</p>
          <p className="text-gray-500/75">{Math.round(day.day.maxtemp_f)}°F</p>
        </div>
      ))}
    </Card>
    );
}
