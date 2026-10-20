import { getWeather } from "./api";
import { useQuery } from "@tanstack/react-query";
import Card from "./components/cards/Card";
import { Suspense, useState } from "react";
import DailyForecast from "./components/cards/DailyForecast";
import HourlyForecast from "./components/cards/HourlyForecast";
import CurrentWeather from "./components/cards/CurrentWeather";
import AdditionalInfo from "./components/cards/AdditionalInfo";
import Map from "./components/Map";
import type { Coords, LocationCoords } from "./types";
import LocationDropdown from "./components/dropdowns/LocationDropdown";
import MapTypeDropdown from "./components/dropdowns/MapTypeDropdown";
import MapLegend from "./components/MapLegend";
import CurrentSkeleton from "./components/skeletons/CurrentSkeleton";
import HourlySkeleton from "./components/skeletons/HourlySkeleton";
import DailySkeleton from "./components/skeletons/DailySkeleton";
import AdditionalSkeleton from "./components/skeletons/AdditionalSkeleton";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 27.71, lon: 85.32 });
  const [location, setLocation] = useState("custom");
  const [locationCoords, setLocationCoords] = useState<LocationCoords>({
    latitude: 0,
    longitude: 0,
  });
  const [mapType, setMapType] = useState<string>("none");

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  return (
    <>
      <div className="flex flex-col gap-8">
        <div className="flex gap-8">
          <div className="flex gap-4">
            <h1>Location: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex gap-4">
            <h1>Map type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
        </div>
        <div className="relative">
          <Map
            coords={coords}
            onMapClick={onMapClick}
            mapType={mapType}
            locationCoords={locationCoords}
          />
          {mapType !== "none" && <MapLegend mapType={mapType} />}
        </div>
        <Suspense fallback={<CurrentSkeleton />}>
          <CurrentWeather
            coords={coords}
            location={location}
            setLocationCoords={setLocationCoords}
          />
        </Suspense>
        <Suspense fallback={<HourlySkeleton/>}>
          <HourlyForecast coords={coords} location={location} />
        </Suspense>
        <Suspense fallback={<DailySkeleton/>}>
          <DailyForecast coords={coords} location={location} />
        </Suspense>
        <Suspense fallback={<AdditionalSkeleton/>}>
          <AdditionalInfo coords={coords} location={location} />
        </Suspense>
      </div>
    </>
  );
}

export default App;
