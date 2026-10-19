import { useSuspenseQuery } from "@tanstack/react-query";
import Card from "./Card";
import { getWeather } from "../../api";
import Sunrise from "../../assets/sunrise.svg?react";
import Sunset from "../../assets/sunset.svg?react";
import Cloud from "../../assets/cloud.svg?react";
import UpArrow from "../../assets/uparrow.svg?react";
import Uv from "../../assets/uv.svg?react";
import Wind from "../../assets/wind.svg?react";
import Pressure from "../../assets/pressure.svg?react";
import { number, transform } from "zod";
import type { Coords } from "../../types";

type Props = {
  coords: Coords;
  location:string;
};

export default function AdditionalInfo({ coords,location }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords,location],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon,location }),
  });
  if (!data) return;
  return (
    <Card
      title="Additional Weather Info"
      childrenClassName="grid grid-cols-1 md:grid-cols-2 gap-8"
    >
      {rows.map(({ label, value, Icon }) => {
        if (label === "Sunrise" || label === "Sunset") {
          const numberValue = data.forecast.forecastday[0].astro[value];
          return (
            <div className="flex justify-between" key={value}>
              <div className="flex gap-4">
                <span className="text-gray-500">{label}</span>
                <Icon className="size-8" />
              </div>
              <span>{numberValue}</span>
            </div>
          );
        } else {
          return (
            <div className="flex justify-between" key={value}>
              <div className="flex gap-4">
                <span className="text-gray-500">{label}</span>
                <Icon className="size-8" />
              </div>
              <span>
                <FormatComponent value={value} number={data.current[value]} />
              </span>
            </div>
          );
        }
      })}
    </Card>
  );
}

function FormatComponent({
  value,
  number,
}: {
  value: string;
  number?: number;
}) {
  if (value === "wind_degree")
    return (
      <UpArrow
        className="size-8 "
        style={{ transform: `rotate(${number}degree)` }}
      />
    );
  return number;
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
] as const;
