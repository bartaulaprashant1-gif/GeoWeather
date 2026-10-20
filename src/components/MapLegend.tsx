import React from "react";

type Props = {
  mapType: string;
};

export default function MapLegend({ mapType }: Props) {
  const data = mapTypeData[mapType];

  const maxValue = data.stops[data.stops.length - 1].value;

  const gradientStops = data.stops
    .map((stop) => `${stop.color} ${(stop.value / maxValue) * 100}%`)
    .join(",");

  return (
    <div className="absolute top-4 right-4 z-50 w-48 xs:w-96 rounded-xl shadow-lg p-4 bg-background/50 border border-accent/70 flex flex-col gap-4">
      <h3 className="text-sm font-semibold text-foreground">{data.title}</h3>
      <div
        className="w-full h-6 rounded-xl border border-accent/70"
        style={{
          background: `linear-gradient(to right, ${gradientStops})`,
        }}
      />
      <div className="flex justify-between text-xs text-foreground">
        <span>
          Low
        </span>
        <span>
          High
        </span>
      </div>
    </div>
  );
}

const mapTypeData: Record<
  string,
  {
    title: string;
    unit: string;
    stops: ColorStop[];
  }
> = {
  precip: {
    title: "Rain (mm)",
    unit: "mm",
    stops: [
      { value: 0, color: "rgb(128, 129, 129)" },
      { value: 50, color: "rgb(74, 100, 118)" },
      { value: 100, color: "rgb(32, 77, 119)" },
    ],
  },
  tmp2m: {
    title: "Temperature (°F)",
    unit: "°F",
    stops: [
      { value: 0, color: "rgb(35, 81, 128)" },
      { value: 15, color: "rgb(84, 128, 127)" },
      { value: 30, color: "rgb(94, 128, 56)" },
      { value: 45, color: "rgb(129, 122, 22)" },
      { value: 60, color: "rgb(129, 93, 19)" },
      { value: 75, color: "rgb(129, 62, 20)" },
      { value: 100, color: "rgb(128, 21, 21)" },
    ],
  },
  pressure: {
    title: "Pressure (mmhg)",
    unit: "mmhg",
    stops: [
      { value: 0, color: "rgb(125, 80, 47)" },
      { value: 33, color: "rgb(128, 106, 69)" },
      { value: 66, color: "rgb(103, 120, 124)" },
      { value: 99, color: "rgb(12, 74, 118)" },
      { value: 140, color: "rgb(62, 18, 71)" },
    ],
  },
  wind: {
    title: "Wind (p)",
    unit: "p",
    stops: [
      { value: 0, color: "rgb(118, 123, 129)" },
      { value: 50, color: "rgb(99, 112, 129)" },
      { value: 100, color: "rgb(76, 101, 130)" },
    ],
  },
};

interface ColorStop {
  value: number;
  color: string;
  opacity?: number;
}
