import { getWeather } from "@/api";
import type { Coords } from "../types";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";
import { clsx } from "clsx";

type Props = {
  coords: Coords;
  location: string;
  childrenClassName?: string;
};

export default function SidePanel(props: Props) {
  return (
    <div className="fixed top-0 right-0 h-screen w-80 py-8 px-4 shadow-md bg-sidebar z-200">
      <Suspense>
        <AirPollution {...props} />
      </Suspense>
    </div>
  );
}

function AirPollution({ coords, location }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ["weather", coords, location],
    queryFn: () => getWeather({ lat: coords.lat, lon: coords.lon, location }),
  });

  if (!data) return;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-semibold">Air Pollution</h1>
      <h1 className="text-4xl font-semibold">
        {data.current.air_quality?.["us-epa-index"]}
      </h1>
      <h1 className="text-2xl font-semibold">AQI</h1>
      {data.current.air_quality &&
        Object.entries(data.current.air_quality).map(([key, value]) => {
          if(key==="us-epa-index" || key==="gb-defra-index") return
          const pollutant =
            airQualityRanges[key as keyof typeof airQualityRanges];

          const max = Math.max(pollutant.veryHigh.min, value);

          const currentLevel = (() => {
            for (const [level, range] of Object.entries(pollutant)) {
              if (
                value >= range.min &&
                (range.max === null || value <= range.max)
              )
                return level;
            }
            return "veryHigh";
          })();

          const qualityColor = (() => {
            switch (currentLevel) {
              case "low":
                return "bg-green-500";
              case "moderate":
                return "bg-yellow-500";
              case "high":
                return "bg-orange-500";
              case "veryHigh":
                return "bg-red-500";
              default:
                return "bg-zinc-500";
            }
          })();
          return (
            <Card
              key={key}
              childrenClassName="flex flex-col gap-3"
              className="hover:scale-105  transition-transform duration-300 from-sidebar-accent to-sidebar-accent/60 gap-0!"
            >
              <div className="flex justify-between">
                <span className="text-lg font-bold capitalize">{key}</span>
                <span className="text-lg font-semibold capitalize">
                  {value}
                </span>
              </div>
              <Slider min={0} max={max} value={[value]} disabled />
              <div className="flex justify-between text-xs">
                <p>0</p>
                <p>{max}</p>
              </div>
              <div className="flex justify-between">
                {Object.keys(pollutant).map((quality) => (
                  <span
                  key={quality}
                    className={clsx(
                      "px-2 py-1 rounded-md text-xs font-medium",
                      quality === currentLevel
                        ? qualityColor
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
    </div>
  );
}

type AirQualityLevel = "low" | "moderate" | "high" | "veryHigh";

interface Range {
  min: number;
  max: number | null;
}

type Pollutant = "co" | "o3" | "no2" | "so2" | "pm2_5" | "pm10";

type AirQualityRanges = Record<Pollutant, Record<AirQualityLevel, Range>>;

const airQualityRanges: AirQualityRanges = {
  co: {
    low: { min: 0, max: 1000 },
    moderate: { min: 1000, max: 2000 },
    high: { min: 2000, max: 3000 },
    veryHigh: { min: 3000, max: null },
  },
  o3: {
    low: { min: 0, max: 60 },
    moderate: { min: 60, max: 100 },
    high: { min: 100, max: 180 },
    veryHigh: { min: 180, max: null },
  },
  no2: {
    low: { min: 0, max: 40 },
    moderate: { min: 40, max: 70 },
    high: { min: 70, max: 200 },
    veryHigh: { min: 200, max: null },
  },
  so2: {
    low: { min: 0, max: 20 },
    moderate: { min: 20, max: 80 },
    high: { min: 80, max: 350 },
    veryHigh: { min: 350, max: null },
  },
  pm2_5: {
    low: { min: 0, max: 10 },
    moderate: { min: 10, max: 25 },
    high: { min: 25, max: 75 },
    veryHigh: { min: 75, max: null },
  },
  pm10: {
    low: { min: 0, max: 20 },
    moderate: { min: 20, max: 50 },
    high: { min: 50, max: 200 },
    veryHigh: { min: 200, max: null },
  },
};

const pollutantNameMapping: Record<Pollutant, string> = {
  co: "Carbon monoxide",
  o3: "Ozone",
  no2: "Nitrogen dioxide",
  so2: "Sulfur dioxide",
  pm2_5: "Fine particles matter",
  pm10: "Particulate matter 10",
};
