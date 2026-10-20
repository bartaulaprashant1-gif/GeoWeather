import { getWeather } from "@/api";
import type { Coords } from "../types";
import { useSuspenseQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import Card from "./cards/Card";
import { Slider } from "./ui/slider";

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
      <h1 className="text-4xl font-semibold">{data.current.air_quality?.["us-epa-index"]}</h1>
      <h1 className="text-2xl font-semibold">AQI</h1>
      {data.current.air_quality &&
        Object.entries(data.current.air_quality).map(([key, value]) => {
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
              <Slider />
            </Card>
          );
        })}
    </div>
  );
}
