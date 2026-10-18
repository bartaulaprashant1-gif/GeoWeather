import { useSuspenseQuery } from "@tanstack/react-query"
import Card from "./Card"
import { getWeather } from "../../api"
import Sunrise from "../../assets/sunrise.svg"
import Sunset from "../../assets/sunset.svg"
import Cloud from "../../assets/cloud.svg"
import UpArrow from "../../assets/uparrow.svg"
import Uv from "../../assets/uv.svg"
import Wind from "../../assets/wind.svg"
import Pressure from "../../assets/pressure.svg"
import { number } from "zod"

type Props = {
//   coords: Coords
}

export default function AdditionalInfo() {
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
      "forecast": {
        "forecastday": [
            {
                "date": "2026-10-17",
                "date_epoch": 1792195200,
                "day": {
                    "maxtemp_c": 13.9,
                    "maxtemp_f": 57.1,
                    "mintemp_c": 8.7,
                    "mintemp_f": 47.6,
                    "avgtemp_c": 10.9,
                    "avgtemp_f": 51.6,
                    "maxwind_mph": 14.1,
                    "maxwind_kph": 22.7,
                    "totalprecip_mm": 0.17,
                    "totalprecip_in": 0.01,
                    "totalsnow_cm": 0.0,
                    "avgvis_km": 10.0,
                    "avgvis_miles": 6.0,
                    "avghumidity": 65,
                    "daily_will_it_rain": 0,
                    "daily_chance_of_rain": 17,
                    "daily_will_it_snow": 0,
                    "daily_chance_of_snow": 0,
                    "condition": {
                        "text": "Sunny",
                        "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
                        "code": 1000
                    },
                    "uv": 1.8,
                    "avgwetbulb_c": 7.8,
                    "avgwetbulb_f": 46.0,
                    "maxwetbulb_c": 9.5,
                    "maxwetbulb_f": 49.1,
                    "air_quality": {
                        "co": 175.95833333333334,
                        "no2": 12.591666666666663,
                        "o3": 52.916666666666664,
                        "so2": 1.1625,
                        "pm2_5": 5.362500000000002,
                        "pm10": 9.575000000000001,
                        "us-epa-index": 1,
                        "gb-defra-index": 1
                    }
                },
                "astro": {
                    "sunrise": "07:28 AM",
                    "sunset": "06:03 PM",
                    "moonrise": "03:02 PM",
                    "moonset": "10:23 PM",
                    "moon_phase": "First Quarter",
                    "moon_illumination": 47,
                    "is_moon_up": 0,
                    "is_sun_up": 1
                },
                "hour": [
                    {
                        "time_epoch": 1792191600,
                        "time": "2026-10-17 00:00",
                        "temp_c": 10.2,
                        "temp_f": 50.4,
                        "is_day": 0,
                        "condition": {
                            "text": "Clear",
                            "icon": "//cdn.weatherapi.com/weather/64x64/night/113.png",
                            "code": 1000
                        },
                        "wind_mph": 8.5,
                        "wind_kph": 13.7,
                        "wind_degree": 333,
                        "wind_dir": "NNW",
                        "pressure_mb": 1029.0,
                        "pressure_in": 30.4,
                        "precip_mm": 0.0,
                        "precip_in": 0.0,
                        "snow_cm": 0.0,
                        "humidity": 67,
                        "cloud": 0,
                        "feelslike_c": 7.9,
                        "feelslike_f": 46.2,
                        "windchill_c": 8.4,
                        "windchill_f": 47.1,
                        "heatindex_c": 10.2,
                        "heatindex_f": 50.4,
                        "dewpoint_c": 4.5,
                        "dewpoint_f": 40.1,
                        "will_it_rain": 0,
                        "chance_of_rain": 5,
                        "will_it_snow": 0,
                        "chance_of_snow": 0,
                        "vis_km": 10.0,
                        "vis_miles": 6.0,
                        "gust_mph": 20.8,
                        "gust_kph": 33.5,
                        "uv": 0,
                        "wetbulb_c": 7.4,
                        "wetbulb_f": 45.4,
                        "air_quality": {
                            "co": 182.0,
                            "no2": 20.8,
                            "o3": 46.0,
                            "so2": 1.5,
                            "pm2_5": 6.8,
                            "pm10": 10.4,
                            "us-epa-index": 1,
                            "gb-defra-index": 1
                        },
                        "short_rad": 0,
                        "diff_rad": 0,
                        "dni": 0,
                        "gti": 0
                    },
                ]
            },
          ]
      }
}
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {rows.map(({ label, value, Icon }) => {
        if(label==="Sunrise" || label === "Sunset"){
          const numberValue=demoData.forecast.forecastday[0].astro[value]
          return <div className="flex justify-between" key={value}>
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            {/* <Icon className="size-8" /> */}
          </div>
          <span>
            {numberValue}
          </span>
        </div>
        }else{
        return <div className="flex justify-between" key={value}>
          <div className="flex gap-4">
            <span className="text-gray-500">{label}</span>
            {/* <Icon className="size-8" /> */}
          </div>
          <span>
            <FormatComponent value={value} number={demoData.current[value]} />
          </span>
        </div>
        }
      }
      )}
    </Card>
  )
}

function FormatComponent({ value, number }: { value: string ,number?:number }) {
  if (value === "wind_deg")
    return (
      <UpArrow
      />
    )
    return number
}

const rows = [
  {
    label: "Cloudiness (%)",
    value: "cloud",
    Icon: Cloud,
  },
  {
    label: "UV Index",
    value: "uv",
    Icon: Uv,
  },
  {
    label: "Wind Direction",
    value: "wind_degree",
    Icon: Wind,
  },
  {
    label: "Pressure (hPa)",
    value: "pressure_mb",
    Icon: Pressure,
  },
  {
    label: "Sunrise",
    value: "sunrise",
    Icon: Sunrise,
  },
  {
    label: "Sunset",
    value: "sunset",
    Icon: Sunset,
  },
] as const