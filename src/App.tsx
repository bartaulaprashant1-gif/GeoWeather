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
import SidePanel from "./components/SidePanel";
import Hamburger from "/src/assets/hamburger.svg?react";

function App() {
  const [coords, setCoords] = useState<Coords>({ lat: 27.71, lon: 85.32 });
  const [location, setLocation] = useState("custom");
  const [locationCoords, setLocationCoords] = useState<LocationCoords>({
    latitude: 0,
    longitude: 0,
  });
  const [mapType, setMapType] = useState<string>("none");
  const [isSidePanelOpen, setIsSidePanelOpen] = useState(false);

  const onMapClick = (lat: number, lon: number) => {
    setCoords({ lat, lon });
    setLocation("custom");
  };

  return (
    <>
      <div className="flex flex-col gap-8 w-full p-5 lg:w-[calc(100dvw-var(--sidebar-width))]">
        <div className="flex gap-8">
          <div className="flex gap-4 flex-wrap">
            <h1>Location: </h1>
            <LocationDropdown location={location} setLocation={setLocation} />
          </div>
          <div className="flex gap-4 flex-wrap">
            <h1>Map type:</h1>
            <MapTypeDropdown mapType={mapType} setMapType={setMapType} />
          </div>
          <div className="flex ml-auto mr-3 gap-4 ">
            <button onClick={() => setIsSidePanelOpen(!isSidePanelOpen)}>
              <Hamburger className="size-6 invert " />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
          <div className="relative col-span-1 md:col-span-2">
            <Map
              coords={coords}
              onMapClick={onMapClick}
              mapType={mapType}
              locationCoords={locationCoords}
            />
            {mapType !== "none" && <MapLegend mapType={mapType} />}
          </div>
          <div className="cols-span-1">
            <Suspense fallback={<CurrentSkeleton />}>
              <CurrentWeather
                coords={coords}
                location={location}
                setLocationCoords={setLocationCoords}
              />
            </Suspense>
          </div>
          <div className="cols-span-1">
            <Suspense fallback={<DailySkeleton />}>
              <DailyForecast coords={coords} location={location} />
            </Suspense>
          </div>
          <div className="cols-span-1 md:col-span-2">
            <Suspense fallback={<HourlySkeleton />}>
              <HourlyForecast coords={coords} location={location} />
            </Suspense>
          </div>
          <div className="cols-span-1 md:col-span-2">
            <Suspense fallback={<AdditionalSkeleton />}>
              <AdditionalInfo coords={coords} location={location} />
            </Suspense>
          </div>
                </div>
        </div>
      <SidePanel
        coords={coords}
        location={location}
        isSidePanelOpen={isSidePanelOpen}
        setIsSidePanelOpen={setIsSidePanelOpen}
      />
    </>
  );
}

export default App;
