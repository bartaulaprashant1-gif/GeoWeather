import { useSuspenseQuery } from "@tanstack/react-query"
import { getWeather } from "../../api"
import Card from "./Card"
import WeatherIcon from "../WeatherIcon"

type Props = {
}

export default function CurrentWeather() {
  const demoData={
    "location": {
        "name": "London",
        "region": "City of London, Greater London",
        "country": "United Kingdom",
        "lat": 51.5171,
        "lon": -0.1062,
        "tz_id": "Europe/London",
        "localtime_epoch": 1792226084,
        "localtime": "2026-10-17 09:34"
    },
    "current": {
        "last_updated_epoch": 1792224900,
        "last_updated": "2026-10-17 09:15",
        "temp_c": 9.4,
        "temp_f": 48.9,
        "is_day": 1,
        "condition": {
            "text": "Sunny",
            "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
            "code": 1000
        },
        "wind_mph": 10.3,
        "wind_kph": 16.6,
        "wind_degree": 352,
        "wind_dir": "N",
        "pressure_mb": 1033.0,
        "pressure_in": 30.5,
        "precip_mm": 0.0,
        "precip_in": 0.0,
        "humidity": 76,
        "cloud": 0,
        "feelslike_c": 6.8,
        "feelslike_f": 44.2,
        "windchill_c": 7.0,
        "windchill_f": 44.6,
        "heatindex_c": 9.4,
        "heatindex_f": 48.9,
        "dewpoint_c": 5.4,
        "dewpoint_f": 41.8,
        "vis_km": 10.0,
        "vis_miles": 6.0,
        "uv": 0.2,
        "gust_mph": 25.8,
        "gust_kph": 41.5,
        "will_it_rain": 0,
        "chance_of_rain": 8,
        "will_it_snow": 0,
        "chance_of_snow": 0,
        "wetbulb_c": 7.4,
        "wetbulb_f": 45.4,
        "air_quality": {
            "co": 190.0,
            "no2": 15.4,
            "o3": 42.0,
            "so2": 1.8,
            "pm2_5": 5.4,
            "pm10": 10.5,
            "us-epa-index": 1,
            "gb-defra-index": 1
        },
        "short_rad": 95.06,
        "diff_rad": 66.21,
        "dni": 201.27,
        "gti": 57.3
    },
}
  return (
    <Card
      title="Current Weather"
      childrenClassName="flex flex-col items-center gap-6 2xl:justify-between"
    >
      <div className="flex flex-col gap-2 items-center">
        <h2 className="text-6xl font-semibold text-center">
          {Math.round(demoData.current.temp_f)}°F
        </h2>
        <WeatherIcon src={`${demoData.current.condition.icon}`} className="size-14"/>
        <h3 className="capitalize text-xl">{demoData.current.condition.text}</h3>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-xl text-center">Local Time:</p>
        <h3 className="text-4xl font-semibold">
          {new Intl.DateTimeFormat("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: demoData.location.tz_id,
          }).format(new Date(demoData.location.localtime))}
        </h3>
      </div>
      <div className="flex justify-between w-full">
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Feels Like</p>
          <p>{Math.round(demoData.current.feelslike_f)}°F</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Humidity</p>
          <p>{demoData.current.humidity}%</p>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-500">Wind</p>
          <p>{demoData.current.wind_mph} mph</p>
        </div>
      </div>
    </Card>
  )
}